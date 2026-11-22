const activeShares = new Map();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Track cleanup interval
let cleanupInterval = null;

module.exports = (io, socket) => {

  // Start cleanup interval if not already running
  if (!cleanupInterval) {
    cleanupInterval = setInterval(() => {
      cleanupExpiredShares(io);
    }, 5000); // Check every 5 seconds for more responsive expiry
  }

  // Auto-assign room based on IP subnet when client connects
  socket.on('join-wifi', () => {
    let clientIP = socket.handshake.headers['x-forwarded-for'] 
      || socket.handshake.address 
      || socket.request.connection.remoteAddress 
      || socket.conn.remoteAddress;

    clientIP = clientIP?.replace('::ffff:', '').split(',')[0].trim();

    const subnet = getSubnet(clientIP);

    socket.join(subnet);
    socket.wifiRoom = subnet;

    socket.emit('room-assigned', { roomId: subnet, subnet, ip: clientIP });

    console.log(`[JOIN] ${socket.id} joined room: ${subnet} (IP: ${clientIP})`);

    // Send existing active shares in this room to new user
    const roomShares = getActiveRoomShares(subnet);

    if (roomShares.length > 0) {
      console.log(`[JOIN] Sending ${roomShares.length} existing shares to ${socket.id}`);
      socket.emit('existing-shares', roomShares);
    }
  });

  // Manual room fallback
  socket.on('join-manual-room', (roomCode) => {
    if (socket.wifiRoom) {
      socket.leave(socket.wifiRoom);
    }
    socket.join(roomCode);
    socket.wifiRoom = roomCode;
    socket.emit('room-assigned', { roomId: roomCode, subnet: null });
    console.log(`[MANUAL] ${socket.id} joined room: ${roomCode}`);
  });

  // Create share — BIDIRECTIONAL: any user can create
  socket.on('create-share', (shareData) => {
    console.log(`[CREATE] Share request from ${socket.id}`, shareData.type);

    const shareId = generateShareId();
    const room = socket.wifiRoom;

    if (!room) {
      socket.emit('share-error', 'Not connected to a WiFi room. Please wait for connection.');
      return;
    }

    // Validate content based on type
    let validatedContent = shareData.content;

    if (shareData.type === 'link' && !isValidUrl(validatedContent)) {
      socket.emit('share-error', 'Invalid URL provided');
      return;
    }

    // FILE SIZE VALIDATION (5MB limit)
    if (shareData.type === 'file') {
      if (!shareData.fileData) {
        socket.emit('share-error', 'No file data provided');
        return;
      }

      const base64Length = shareData.fileData.length;
      const fileSizeBytes = Math.ceil(base64Length * 0.75);

      if (fileSizeBytes > MAX_FILE_SIZE) {
        socket.emit('share-error', `File size exceeds 5MB limit. Your file is ${(fileSizeBytes / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }

      validatedContent = {
        name: shareData.content,
        data: shareData.fileData,
        size: fileSizeBytes,
        mimeType: shareData.mimeType || 'application/octet-stream'
      };
    }

    const share = {
      id: shareId,
      type: shareData.type,
      content: validatedContent,
      expiry: shareData.expiry,
      wifiRoom: room,
      senderId: socket.id,
      createdAt: new Date(),
      expiresAt: getExpiryTime(shareData.expiry),
    };

    activeShares.set(shareId, share);

    // Prepare broadcast data
    const broadcastData = {
      id: shareId,
      type: share.type,
      content: share.type === 'text' ? share.content : null,
      metadata: {
        size: share.type === 'file' ? share.content.size : (typeof share.content === 'string' ? share.content.length : 0),
        filename: share.type === 'file' ? share.content.name : null,
        url: share.type === 'link' ? share.content : null,
        mimeType: share.type === 'file' ? share.content.mimeType : null,
      },
      sender: socket.id,
      createdAt: share.createdAt,
      expiresAt: share.expiresAt, // Send expiry time so frontend can also track
    };

    // Broadcast to ALL in room INCLUDING sender
    io.to(room).emit('new-share', broadcastData);

    console.log(`[BROADCAST] Room ${room} has ${io.sockets.adapter.rooms.get(room)?.size || 0} clients`);

    // Confirm to sender
    socket.emit('share-created', { 
      shareId, 
      link: `/share/${shareId}`,
      roomId: room,
      expiresAt: share.expiresAt,
    });
  });

  // Access share content
  socket.on('access-share', (shareId) => {
    cleanupExpiredShares(io);

    const share = activeShares.get(shareId);

    if (!share || share.expiresAt < new Date()) {
      socket.emit('share-error', 'Share not found or expired');
      return;
    }

    const responseData = {
      type: share.type,
      content: share.type === 'file' ? null : share.content,
      metadata: {
        size: share.type === 'file' ? share.content.size : (typeof share.content === 'string' ? share.content.length : 0),
        filename: share.type === 'file' ? share.content.name : null,
        mimeType: share.type === 'file' ? share.content.mimeType : null,
      }
    };

    socket.emit('share-content', responseData);
  });

  // Get all shares in room
  socket.on('get-room-shares', () => {
    const room = socket.wifiRoom;
    if (!room) return;

    const shares = getActiveRoomShares(room);
    socket.emit('existing-shares', shares);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    if (socket.wifiRoom) {
      socket.to(socket.wifiRoom).emit('user-left', socket.id);
    }
  });
};

// ==================== HELPER FUNCTIONS ====================

function getActiveRoomShares(room) {
  const now = new Date();
  return Array.from(activeShares.values())
    .filter(share => share.wifiRoom === room && share.expiresAt > now)
    .map(s => ({
      id: s.id,
      type: s.type,
      content: s.type === 'text' ? s.content : null,
      metadata: {
        size: s.type === 'file' ? s.content.size : (typeof s.content === 'string' ? s.content.length : 0),
        filename: s.type === 'file' ? s.content.name : null,
        url: s.type === 'link' ? s.content : null,
        mimeType: s.type === 'file' ? s.content.mimeType : null,
      },
      sender: s.senderId,
      createdAt: s.createdAt,
      expiresAt: s.expiresAt,
    }));
}

function cleanupExpiredShares(io) {
  const now = new Date();
  let cleanedCount = 0;
  const expiredIds = [];

  for (const [id, share] of activeShares) {
    if (share.expiresAt < now) {
      activeShares.delete(id);
      cleanedCount++;
      expiredIds.push(id);
    }
  }

  // Notify all connected clients about expired shares
  if (io && expiredIds.length > 0) {
    io.emit('shares-expired', expiredIds); // Broadcast to ALL clients
    console.log(`[CLEANUP] Removed ${cleanedCount} expired shares: ${expiredIds.join(', ')}`);
  }

  return cleanedCount;
}

function getSubnet(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.includes('127.0.0.1')) {
    return 'local-test-room';
  }
  const parts = ip.split('.');
  return parts.length >= 3 ? `${parts[0]}.${parts[1]}.${parts[2]}` : ip;
}

function generateShareId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function getExpiryTime(expiry) {
  const now = new Date();
  const map = {
    '1 Minute': 1 * 60 * 1000,
    '5 Minutes': 5 * 60 * 1000,
    '10 Minutes': 10 * 60 * 1000,
    '30 Minutes': 30 * 60 * 1000,
    '1 Hour': 60 * 60 * 1000,
    '24 Hours': 24 * 60 * 60 * 1000,
    '7 Days': 7 * 24 * 60 * 60 * 1000,
  };
  return new Date(now.getTime() + (map[expiry] || map['10 Minutes']));
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Export for HTTP routes
module.exports.activeShares = activeShares;
module.exports.MAX_FILE_SIZE = MAX_FILE_SIZE;
module.exports.cleanupExpiredShares = cleanupExpiredShares;