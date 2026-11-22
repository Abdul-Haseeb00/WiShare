import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async'
import { 
  ArrowLeft, 
  HelpCircle, 
  Wifi,
  UserX,
  Share2,
  Network,
  BadgeCheck,
  EyeOff,
  FileType,
  ShieldAlert,
  MessageCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const HelpPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      icon: Wifi,
      question: 'What is WiShare?',
      answer: 'WiShare is a platform that allows users to share files, links, and text between devices connected to the same Wi-Fi network.',
    },
    {
      icon: UserX,
      question: 'Do I need to create an account?',
      answer: 'No. WiShare is designed to be simple and easy to use without requiring account registration.',
    },
    {
      icon: Share2,
      question: 'What can I share?',
      answer: 'You can share files (up to 5MB), website links, and text and notes.',
    },
    {
      icon: Network,
      question: 'Do both devices need to be on the same Wi-Fi network?',
      answer: 'Yes. WiShare works best when all participating devices are connected to the same local network.',
    },
    {
      icon: BadgeCheck,
      question: 'Is WiShare free to use?',
      answer: 'Yes. WiShare is free to use.',
    },
    {
      icon: EyeOff,
      question: "Why can't another device see my shared content?",
      answer: 'Possible reasons include: devices are connected to different networks, the shared content has expired or been removed, or network restrictions are preventing communication.',
    },
    {
      icon: FileType,
      question: 'What file formats are supported?',
      answer: 'Most common file formats are supported, including PDF, DOCX, TXT, JPG, PNG, ZIP, and many others within the allowed file size limit.',
    },
    {
      icon: ShieldAlert,
      question: 'Is my data secure?',
      answer: 'WiShare takes reasonable measures to protect shared content. However, users should avoid sharing sensitive or confidential information.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
        <Helmet><title>Help Center</title>
        <meta name="description" content="Visit WiShare's Help Center for answers to frequently asked questions about our file sharing service. Learn how to share files, links, and text securely over the same WiFi network." />
        </Helmet>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Help <span className="text-blue-600">Center</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Frequently Asked Questions — everything you need to know about using WiShare.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-10 pb-6">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <faq.icon className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need More Help */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-blue-300 rounded-lg text-xs font-semibold mb-5">
              <MessageCircle className="w-3.5 h-3.5" />
              Need More Help?
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              We're Here to Help
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
              For additional assistance, updates, or announcements, please visit our social media pages.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors"
              >
                LinkedIn <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                Instagram <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Thank you for using WiShare. © 2026 WiShare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;