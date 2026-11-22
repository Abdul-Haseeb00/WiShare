import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import {Helmet} from 'react-helmet-async'
import {
  ArrowLeft,
  Wifi,
  WifiOff,
  Upload,
  Type,
  Shield,
  CheckCircle,
  Copy,
  PlusCircle,
  ChevronDown,
  X,
  Monitor,
  Smartphone,
  Globe,
  FileText,
  Download,
  Trash2,
  Settings,
  Clock
} from 'lucide-react';

const SharePage = () => {
  const navigate = useNavigate();
  const { 
    socket, 
    isConnected, 
    roomId, 
    networkInfo, 
    networkDisplayName,
    incomingShares, 
    selectedShare,
    createShare, 
    joinManualRoom,
    closeSelectedShare
  } = useSocket();

  const [activeTab, setActiveTab] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [expiry, setExpiry] = useState('10 Minutes');
  const [isSaved, setIsSaved] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [manualRoomCode, setManualRoomCode] = useState('');
  const [receivedContent, setReceivedContent] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Expiry tracking - compact inline display
  const [countdownText, setCountdownText] = useState('');
  const expiryTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const maxChars = 5000;
  const maxFileSize = 5 * 1024 * 1024;
  const charCount = textContent.length;

  const tabs = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'file', label: 'File', icon: FileText },
  ];

  const expiryOptions = ['1 Minute', '5 Minutes', '10 Minutes', '30 Minutes'];

  // Clear all share-related state
  const clearShareState = useCallback(() => {
    setIsSaved(false);
    setShareData(null);
    setTextContent('');
    setUploadedFile(null);
    setFileBase64(null);
    setReceivedContent(null);
    setActiveTab('text');
    setUploadError(null);
    setCountdownText('');

    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  // Start compact expiry countdown
  const startExpiryCountdown = useCallback((expiresAt) => {
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const msRemaining = expiryTime - now;

    if (msRemaining <= 0) {
      clearShareState();
      return;
    }

    const updateCountdown = () => {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        setCountdownText('');
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
        clearShareState();
        return;
      }
      const seconds = Math.ceil(remaining / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setCountdownText(mins > 0 ? `${mins}m ${secs}s` : `${secs}s`);
    };

    updateCountdown();
    countdownIntervalRef.current = setInterval(updateCountdown, 1000);

    expiryTimerRef.current = setTimeout(() => {
      clearShareState();
    }, msRemaining);
  }, [clearShareState]);

  useEffect(() => {
    if (!socket) return;

    const handleNewShare = (share) => {
      console.log('[SharePage] New share received:', share);

      if (share.expiresAt) {
        startExpiryCountdown(share.expiresAt);
      }

      if (share.type === 'text' || share.type === 'link') {
        setReceivedContent({
          type: share.type,
          content: share.content,
          isReceived: true,
          sender: share.sender,
          createdAt: share.createdAt,
          shareId: share.id,
          expiresAt: share.expiresAt,
        });
        setActiveTab('text');
        setTextContent(share.content || '');
      } else if (share.type === 'file') {
        setReceivedContent({
          type: 'file',
          filename: share.metadata?.filename || 'Unknown file',
          size: share.metadata?.size || 0,
          shareId: share.id,
          isReceived: true,
          sender: share.sender,
          createdAt: share.createdAt,
          expiresAt: share.expiresAt,
        });
        setActiveTab('file');
        setUploadedFile({
          name: share.metadata?.filename || 'Unknown file',
          size: share.metadata?.size || 0,
          isReceived: true,
          shareId: share.id
        });
      }
    };

    const handleShareCreated = (data) => {
      console.log('[SharePage] Share created:', data);
      setShareData(data);
      setIsSaved(true);
      setIsSharing(false);

      if (data.expiresAt) {
        startExpiryCountdown(data.expiresAt);
      }
    };

    const handleShareError = (errMsg) => {
      console.error('[SharePage] Share error:', errMsg);
      setIsSharing(false);
      setUploadError(errMsg);
      setTimeout(() => setUploadError(null), 5000);
    };

    const handleShareExpired = (shareId) => {
      console.log('[SharePage] Share expired:', shareId);
      if (receivedContent?.shareId === shareId || shareData?.shareId === shareId) {
        clearShareState();
      }
    };

    const handleSharesExpired = (expiredIds) => {
      console.log('[SharePage] Multiple shares expired:', expiredIds);
      const ourShareId = shareData?.shareId;
      const receivedShareId = receivedContent?.shareId;

      if (expiredIds.includes(ourShareId) || expiredIds.includes(receivedShareId)) {
        clearShareState();
      }
    };

    socket.on('new-share', handleNewShare);
    socket.on('share-created', handleShareCreated);
    socket.on('share-error', handleShareError);
    socket.on('share-expired', handleShareExpired);
    socket.on('shares-expired', handleSharesExpired);

    return () => {
      socket.off('new-share', handleNewShare);
      socket.off('share-created', handleShareCreated);
      socket.off('share-error', handleShareError);
      socket.off('share-expired', handleShareExpired);
      socket.off('shares-expired', handleSharesExpired);
    };
  }, [socket, receivedContent, shareData, clearShareState, startExpiryCountdown]);

  useEffect(() => {
    return () => {
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getShareType = () => {
    if (activeTab === 'file') return 'file';
    if (isValidUrl(textContent.trim())) return 'link';
    return 'text';
  };

  const handleSave = () => {
    if (!isConnected) {
      setUploadError('Not connected to server. Please check your connection.');
      return;
    }

    if (!roomId) {
      setUploadError('Not joined to a WiFi room yet. Please wait...');
      return;
    }

    const type = getShareType();

    if (type === 'text' || type === 'link') {
      if (!textContent.trim()) {
        setUploadError('Please enter some content to share.');
        return;
      }
    } else if (type === 'file') {
      if (!uploadedFile || uploadedFile.isReceived) {
        setUploadError('Please upload a file to share.');
        return;
      }
      if (!fileBase64) {
        setUploadError('File is still processing. Please wait.');
        return;
      }
    }

    setIsSharing(true);
    setUploadError(null);
    setReceivedContent(null);

    const sharePayload = {
      type,
      content: type === 'file' ? uploadedFile.name : textContent,
      expiry,
    };

    if (type === 'file') {
      sharePayload.fileData = fileBase64;
      sharePayload.mimeType = uploadedFile.type || 'application/octet-stream';
    }

    createShare(sharePayload);
  };

  const handleShareAnother = () => {
    clearShareState();
  };

  const copyToClipboard = () => {
    if (shareData?.shareId) {
      const link = `${window.location.origin}/share/${shareData.shareId}`;
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError(null);

    if (file.size > maxFileSize) {
      setUploadError(`File must be under 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setFileBase64(base64);
      setUploadedFile(file);
      setReceivedContent(null);
    } catch (error) {
      console.error('File conversion error:', error);
      setUploadError('Failed to process file. Please try again.');
    }
  };

  const handleJoinManualRoom = () => {
    if (manualRoomCode.trim()) {
      joinManualRoom(manualRoomCode.trim());
      setManualRoomCode('');
    }
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    if (receivedContent?.isReceived) {
      setReceivedContent(null);
    }
  };

  const clearReceivedContent = () => {
    setReceivedContent(null);
    setTextContent('');
    setUploadedFile(null);
    setFileBase64(null);
    setCountdownText('');
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const deleteFile = () => {
    setUploadedFile(null);
    setFileBase64(null);
    setReceivedContent(null);
  };

  const downloadFile = () => {
    if (receivedContent?.shareId) {
      const downloadUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/share/${receivedContent.shareId}/download`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = receivedContent.filename || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getNetworkIcon = () => {
    if (!networkInfo) return <Globe className="w-4 h-4" />;
    switch (networkInfo.type) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'cellular':
        return <Smartphone className="w-4 h-4" />;
      case 'ethernet':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50/30 flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 select-none">
      <Helmet><title>WiShare - Share Text or File</title>
      <meta name="description" content="WiShare allows you to share text, links, and files under 5MB securely over the same WiFi network. Instantly send and receive content with others on the same network." />
      </Helmet>
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full gap-2">

        {/* Top Bar */}
        <div className="flex items-center justify-between flex-shrink-0">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${
            isConnected 
              ? 'bg-blue-50 text-blue-600 border-blue-100' 
              : 'bg-red-50 text-red-600 border-red-100'
          }`}>
            {isConnected ? getNetworkIcon() : <WifiOff className="w-4 h-4" />}
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {isConnected 
                ? `${networkDisplayName || 'Connected'}${roomId ? ` • ${roomId}` : ''}` 
                : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Manual Room Input (Fallback) */}
        {!roomId && isConnected && (
          <div className="flex-shrink-0 p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between gap-3">
            <p className="text-xs text-yellow-700 font-medium whitespace-nowrap">Enter room code:</p>
            <div className="flex gap-2 flex-1 max-w-xs">
              <input 
                type="text" 
                value={manualRoomCode}
                onChange={(e) => setManualRoomCode(e.target.value)}
                placeholder="192.168.1"
                className="w-full px-3 py-1.5 border border-yellow-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleJoinManualRoom()}
              />
              <button 
                onClick={handleJoinManualRoom}
                className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-xs font-medium hover:bg-yellow-600 transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {uploadError && (
          <div className="flex-shrink-0 p-2 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-2">
            <span className="text-xs text-red-700 font-medium">{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="text-red-500 hover:text-red-700 flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Page Title */}
        <div className="flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Share <span className="text-blue-500">Text or File</span>
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Type text, paste a link, or upload a file. Others on the same WiFi will see it instantly.
          </p>
        </div>

        {/* Received Content Indicator with inline countdown */}
        {receivedContent?.isReceived && (
          <div className="flex-shrink-0 p-2 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Wifi className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <span className="text-xs text-green-700 font-medium truncate">
                Received {receivedContent.type} from network
              </span>
              {countdownText && (
                <span className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                  <Clock className="w-3 h-3" />
                  {countdownText}
                </span>
              )}
            </div>
            <button 
              onClick={clearReceivedContent}
              className="text-xs text-green-600 hover:text-green-800 font-medium px-2 py-0.5 flex-shrink-0"
            >
              Clear
            </button>
          </div>
        )}

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 flex-1 min-h-0">

          {/* RIGHT COLUMN - Sharing Fields (3 cols) */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col h-full min-h-0">

              {/* Tabs */}
              <div className="flex gap-0 mb-3 border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border-b-2 border-transparent'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Workspace - NO overflow-y-auto, everything fits */}
              <div className="flex-1 min-h-0">

                {/* Text Input Area */}
                {activeTab === 'text' && (
                  <div className="flex flex-col h-full gap-2">
                    <div className="flex items-center justify-between flex-shrink-0">
                      <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        {receivedContent?.isReceived ? 'Received Content' : 'Content payload'}
                      </label>
                      <span className="text-xs font-mono text-gray-400">
                        {charCount}/{maxChars}
                      </span>
                    </div>

                    <div className="relative flex-1 min-h-0">
                      <textarea
                        value={textContent}
                        onChange={handleTextChange}
                        maxLength={maxChars}
                        className={`w-full h-full p-3 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${
                          receivedContent?.isReceived 
                            ? 'bg-green-50/20 border-green-200 text-gray-700' 
                            : 'bg-white border-gray-200 text-gray-700'
                        }`}
                        placeholder="Type something or paste a link here..."
                      />
                      {receivedContent?.isReceived && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs font-semibold text-green-600 bg-green-100/80 px-2 py-0.5 rounded-full">
                            Live
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* File Upload Content Area */}
                {activeTab === 'file' && (
                  <div className="flex flex-col h-full gap-2">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex-shrink-0">
                      {receivedContent?.isReceived ? 'Received File' : 'File payload'}
                    </label>

                    <div className="flex-1 min-h-0">
                      {receivedContent?.isReceived && uploadedFile ? (
                        <div className="w-full h-full bg-green-50/20 border border-green-200 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                          <FileText className="w-10 h-10 text-green-500" />
                          <div className="min-w-0 px-2">
                            <span className="text-sm text-gray-700 font-semibold block truncate">{uploadedFile.name}</span>
                            <span className="text-xs text-gray-400 block">
                              {uploadedFile.size ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : ''}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={downloadFile}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" /> Download
                            </button>
                            <button
                              onClick={deleteFile}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 text-xs font-semibold rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Dismiss
                            </button>
                          </div>
                        </div>
                      ) : uploadedFile ? (
                        <div className="w-full h-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                          <div className="min-w-0 px-2">
                            <span className="text-sm text-gray-700 font-semibold block truncate">{uploadedFile.name}</span>
                            <span className="text-xs text-gray-400 block">
                              {(uploadedFile.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <label
                              htmlFor="file-upload-replace"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" /> Replace
                            </label>
                            <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload-replace" accept="*/*" />
                            <button
                              onClick={deleteFile}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 text-xs font-semibold rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" accept="*/*" />
                          <label
                            htmlFor="file-upload"
                            className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer p-3 text-center"
                          >
                            <Upload className="w-7 h-7 text-gray-300" />
                            <span className="text-xs text-gray-400 font-medium">Click to upload or drag and drop</span>
                            <span className="text-xs text-gray-300">Max 5MB</span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Trigger Block */}
              <button
                onClick={handleSave}
                disabled={isSharing || !isConnected || !roomId || (activeTab === 'file' && receivedContent?.isReceived)}
                className={`w-full mt-3 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex-shrink-0 ${
                  isSharing || !isConnected || !roomId || (activeTab === 'file' && receivedContent?.isReceived)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSharing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Encrypting & Syncing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Share Universally
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LEFT COLUMN - Share Settings (2 cols) */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <Settings className="w-3 h-3 text-blue-600" />
                  </div>
                  Share settings
                </h3>

                {/* Expiry */}
                <div className="flex items-center justify-between bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Expiry</p>
                    <p className="text-xs text-gray-400">Disappears after</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <select
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer font-medium"
                    >
                      {expiryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Countdown display in settings when active */}
                {(isSaved || receivedContent?.isReceived) && countdownText && (
                  <div className="flex items-center justify-between bg-orange-50 p-2.5 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-xs text-orange-700 font-medium">Auto-deletes in</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-600 bg-white px-2 py-0.5 rounded">
                      {countdownText}
                    </span>
                  </div>
                )}
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-2 pt-2 border-t border-gray-100 mt-2">
                <Shield className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-400 leading-normal">
                  Your data is secure and auto-deletes after {expiry.toLowerCase()}. No server storage.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SUCCESS TRANSACTION DRAWER with inline countdown */}
        {isSaved && shareData && (
          <div className="flex-shrink-0 bg-white rounded-2xl border border-green-100 p-2.5 shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-gray-900 truncate">Token pipeline active!</h3>
                <p className="text-xs text-gray-500 truncate">
                  ID: <span className="font-mono bg-gray-50 border border-gray-100 px-1 py-0.5 rounded text-blue-600 font-bold">{shareData.shareId}</span>
                </p>
              </div>
              {countdownText && (
                <span className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {countdownText}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors border border-blue-100"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
              <button
                onClick={handleShareAnother}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <PlusCircle className="w-3 h-3" /> New
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL SYSTEM OVERLAY */}
      {selectedShare?.type === 'file' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Incoming file node</h3>
              <button 
                onClick={closeSelectedShare}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="p-5 text-center">
              <FileText className="w-10 h-10 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-800 font-semibold truncate max-w-xs mx-auto px-2">{selectedShare.metadata?.filename || 'File'}</p>
              <p className="text-xs text-gray-400 mt-0.5 mb-4">
                {selectedShare.metadata?.size ? `${(selectedShare.metadata.size / 1024).toFixed(1)} KB` : ''}
              </p>
              <button
                onClick={closeSelectedShare}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Stream & Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePage;