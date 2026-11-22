import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useSocket = () => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [networkInfo, setNetworkInfo] = useState({
    type: 'unknown',
    ssid: null,
    effectiveType: '4g',
    downlink: 0,
    rtt: 0,
  });
  const [error, setError] = useState(null);
  const [incomingShares, setIncomingShares] = useState([]);
  const [selectedShare, setSelectedShare] = useState(null);

  const detectNetwork = useCallback(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      setNetworkInfo({
        type: connection.type || 'unknown',
        ssid: null,
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
      });

      connection.addEventListener('change', () => {
        setNetworkInfo({
          type: connection.type || 'unknown',
          ssid: null,
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
        });
      });
    }
  }, []);

  useEffect(() => {
    detectNetwork();

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      console.log('[SOCKET] Connected:', socket.id);
      setIsConnected(true);
      setError(null);

      // Join WiFi room on connect
      socket.emit('join-wifi');
    });

    socket.on('disconnect', (reason) => {
      console.log('[SOCKET] Disconnected:', reason);
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('[SOCKET] Connection error:', err);
      setError(err.message);
      setIsConnected(false);
    });

    // Room assignment
    socket.on('room-assigned', ({ roomId, subnet, ip }) => {
      console.log('[SOCKET] Room assigned:', roomId, 'Subnet:', subnet, 'IP:', ip);
      setRoomId(roomId);
    });

    // BIDIRECTIONAL: Receive shares from ANY user in same room
    socket.on('new-share', (share) => {
      console.log('[SOCKET] New share received:', share);
      setIncomingShares((prev) => [share, ...prev]);
    });

    // Existing shares when joining room
    socket.on('existing-shares', (shares) => {
      console.log('[SOCKET] Existing shares:', shares);
      setIncomingShares((prev) => [...shares, ...prev]);
    });

    // Share created confirmation
    socket.on('share-created', (data) => {
      console.log('[SOCKET] Share created:', data);
    });

    // Share content for viewing
    socket.on('share-content', (data) => {
      console.log('[SOCKET] Share content received:', data);
      setSelectedShare(data);
    });

    // Errors
    socket.on('share-error', (errMsg) => {
      console.error('[SOCKET] Share error:', errMsg);
      setError(errMsg);
    });

    // Single share expired
    socket.on('share-expired', (shareId) => {
      console.log('[SOCKET] Share expired:', shareId);
      setIncomingShares((prev) => prev.filter(s => s.id !== shareId));
    });

    // Multiple shares expired (batch cleanup)
    socket.on('shares-expired', (expiredIds) => {
      console.log('[SOCKET] Multiple shares expired:', expiredIds);
      setIncomingShares((prev) => prev.filter(s => !expiredIds.includes(s.id)));
    });

    return () => {
      socket.disconnect();
    };
  }, [detectNetwork]);

  const joinManualRoom = useCallback((roomCode) => {
    if (socketRef.current) {
      socketRef.current.emit('join-manual-room', roomCode);
      setRoomId(roomCode);
    }
  }, []);

  const createShare = useCallback((shareData) => {
    if (!socketRef.current || !isConnected) {
      console.error('[SOCKET] Not connected');
      return false;
    }
    socketRef.current.emit('create-share', shareData);
    return true;
  }, [isConnected]);

  const viewShare = useCallback((shareId) => {
    if (!socketRef.current) return;
    socketRef.current.emit('access-share', shareId);
  }, []);

  const closeSelectedShare = useCallback(() => {
    setSelectedShare(null);
  }, []);

  const getNetworkDisplayName = useCallback(() => {
    if (networkInfo.type === 'wifi') {
      return 'WiFi Network';
    } else if (networkInfo.type === 'cellular') {
      return 'Cellular Network';
    } else if (networkInfo.type === 'ethernet') {
      return 'Ethernet';
    }
    return 'Local Network';
  }, [networkInfo.type]);

  return {
    socket: socketRef.current,
    isConnected,
    roomId,
    networkInfo,
    networkDisplayName: getNetworkDisplayName(),
    error,
    incomingShares,
    selectedShare,
    joinManualRoom,
    createShare,
    viewShare,
    closeSelectedShare,
  };
};