const express = require('express');
const router = express.Router();
const { activeShares, cleanupExpiredShares } = require('../events/shareEvents');

// GET all active shares in a room (fallback polling)
router.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  cleanupExpiredShares(); // Clean up before returning

  const now = new Date();
  const shares = Array.from(activeShares.values())
    .filter(share => share.wifiRoom === roomId && share.expiresAt > now)
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
    }));

  res.json({ shares });
});

// GET a specific share by ID (metadata only)
router.get('/:shareId', (req, res) => {
  const { shareId } = req.params;
  cleanupExpiredShares();

  const share = activeShares.get(shareId);

  if (!share || share.expiresAt < new Date()) {
    return res.status(404).json({ error: 'Share not found or expired' });
  }

  res.json({
    id: share.id,
    type: share.type,
    content: share.type === 'text' ? share.content : null,
    metadata: {
      size: share.type === 'file' ? share.content.size : (typeof share.content === 'string' ? share.content.length : 0),
      filename: share.type === 'file' ? share.content.name : null,
      url: share.type === 'link' ? share.content : null,
      mimeType: share.type === 'file' ? share.content.mimeType : null,
    },
    sender: share.senderId,
    createdAt: share.createdAt,
    expiresAt: share.expiresAt,
  });
});

// GET file download by shareId
router.get('/:shareId/download', (req, res) => {
  const { shareId } = req.params;
  cleanupExpiredShares();

  const share = activeShares.get(shareId);

  if (!share || share.expiresAt < new Date()) {
    return res.status(404).json({ error: 'Share not found or expired' });
  }

  if (share.type !== 'file') {
    return res.status(400).json({ error: 'This share is not a file' });
  }

  const fileData = share.content;
  const buffer = Buffer.from(fileData.data, 'base64');

  res.setHeader('Content-Type', fileData.mimeType || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${fileData.name}"`);
  res.setHeader('Content-Length', buffer.length);

  res.send(buffer);
});

// DELETE a share (manual expiry)
router.delete('/:shareId', (req, res) => {
  const { shareId } = req.params;

  if (!activeShares.has(shareId)) {
    return res.status(404).json({ error: 'Share not found' });
  }

  activeShares.delete(shareId);
  res.json({ message: 'Share deleted successfully' });
});

// GET server stats (for monitoring)
router.get('/stats/server', (req, res) => {
  cleanupExpiredShares();

  const totalShares = activeShares.size;
  const fileShares = Array.from(activeShares.values()).filter(s => s.type === 'file').length;
  const textShares = Array.from(activeShares.values()).filter(s => s.type === 'text').length;
  const linkShares = Array.from(activeShares.values()).filter(s => s.type === 'link').length;

  // Calculate total memory used by files
  let totalFileMemory = 0;
  for (const share of activeShares.values()) {
    if (share.type === 'file' && share.content.data) {
      totalFileMemory += share.content.size;
    }
  }

  res.json({
    totalShares,
    fileShares,
    textShares,
    linkShares,
    totalFileMemoryBytes: totalFileMemory,
    totalFileMemoryMB: (totalFileMemory / (1024 * 1024)).toFixed(2),
    maxFileSizeMB: 5,
  });
});

module.exports = router;