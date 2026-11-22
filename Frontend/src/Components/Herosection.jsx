import React from 'react';
import { 
  Wifi, 
  Upload, 
  Play, 
  Shield, 
  Zap, 
  UserPlus,
  Link as LinkIcon,
  FileText,
  CheckCircle
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-8 max-w-xl">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50/80 text-blue-600 rounded-full text-sm font-medium border border-blue-100/50">
              <Wifi className="w-4 h-4" />
              Share. Connect. Simplify.
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-[3.5rem] font-bold text-gray-900 leading-[1.15] tracking-tight">
              Share Text, Links<br />
              & Files <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">under 5MB</span>
            </h1>

            {/* Subtext */}
            <p className="text-base text-gray-500 leading-relaxed max-w-md">
              Instantly share text, links, and files up to 5MB with anyone connected to the same WiFi.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                <Upload className="w-4 h-4" />
                Start Sharing Now
              </button>
              <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Play className="w-4 h-4 fill-gray-700" />
                How It Works
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserPlus className="w-4 h-4 text-blue-500" />
                <span>No Signup</span>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL HUB */}
          <div className="relative flex items-center justify-center min-h-[420px]">
            
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-transparent rounded-full blur-3xl" />

            {/* SVG Dashed Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Text card to center */}
              <path 
                d="M 120 80 Q 180 140 220 180" 
                stroke="#93C5FD" 
                strokeWidth="1.5" 
                strokeDasharray="6,4" 
                fill="none"
              />
              {/* Link card to center */}
              <path 
                d="M 380 80 Q 320 140 280 180" 
                stroke="#93C5FD" 
                strokeWidth="1.5" 
                strokeDasharray="6,4" 
                fill="none"
              />
              {/* File card to center */}
              <path 
                d="M 120 300 Q 180 240 220 220" 
                stroke="#93C5FD" 
                strokeWidth="1.5" 
                strokeDasharray="6,4" 
                fill="none"
              />
              {/* Shared card to center */}
              <path 
                d="M 380 300 Q 320 240 280 220" 
                stroke="#93C5FD" 
                strokeWidth="1.5" 
                strokeDasharray="6,4" 
                fill="none"
              />
            </svg>

            {/* Center WiFi Hub */}
            <div className="relative z-10 w-36 h-36 bg-white rounded-full shadow-xl shadow-blue-100 flex items-center justify-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Wifi className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Floating Cards */}
            
            {/* Text Card - Top Left */}
            <div className="absolute top-4 left-4 sm:left-8 z-10">
              <div className="bg-green-50/90 backdrop-blur-sm border border-green-100 rounded-xl p-3.5 w-36 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">T</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Text</span>
                </div>
                <div className="space-y-1.5 pl-0.5">
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-2 bg-gray-200 rounded-full w-3/4" />
                </div>
              </div>
            </div>

            {/* Link Card - Top Right */}
            <div className="absolute top-6 right-2 sm:right-6 z-10">
              <div className="bg-white border border-gray-100 rounded-xl p-3.5 w-40 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LinkIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-gray-800 block">Link</span>
                    <span className="text-[11px] text-gray-400 truncate block">https://example.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* File Card - Bottom Left */}
            <div className="absolute bottom-16 left-2 sm:left-4 z-10">
              <div className="bg-white border border-gray-100 rounded-xl p-3.5 w-40 shadow-md">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-gray-800 block">File</span>
                  </div>
                </div>
                <div className="pl-[42px] space-y-0.5">
                  <span className="text-[11px] text-gray-500 block">document.pdf</span>
                  <span className="text-[11px] text-gray-400 block">2.4 MB</span>
                </div>
              </div>
            </div>

            {/* Shared Card - Bottom Right */}
            <div className="absolute bottom-8 right-4 sm:right-8 z-10">
              <div className="bg-white border border-gray-100 rounded-xl p-3.5 w-40 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-gray-800 block">Shared!</span>
                    <span className="text-[11px] text-gray-400 leading-tight block">Successfully delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100">
                <Wifi className="w-4 h-4" />
                Same WiFi Network
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;