import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Clock,
  Heart,
  Send,
  Wifi
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const navigate = useNavigate();

  // SVG Icons for social platforms (not in lucide-react)
  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );

  const socialLinks = [
    {
      icon: LinkedInIcon,
      name: 'LinkedIn',
      desc: 'Follow our professional updates and connect with us on LinkedIn.',
      url: 'https://linkedin.com',
      iconBg: 'bg-blue-50 text-blue-600',
      hoverBorder: 'hover:border-blue-200',
    },
    {
      icon: InstagramIcon,
      name: 'Instagram',
      desc: 'Stay updated with new features and announcements.',
      url: 'https://instagram.com',
      iconBg: 'bg-pink-50 text-pink-600',
      hoverBorder: 'hover:border-pink-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
        <Helmet>
            <title>Contact Us</title>
            <meta name="description" content="Get in touch with WiShare for feedback, suggestions, or inquiries. Connect with us on LinkedIn and Instagram." />
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
            <MessageCircle className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have feedback, suggestions, 
            feature requests, or encounter any issues — we're here to help.
          </p>
        </div>
      </div>

      {/* Thank You Note */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            Thank you for using WiShare. Your experience matters to us, and we appreciate 
            every message that helps us improve.
          </p>
        </div>
      </div>

      {/* Connect With Us */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Send className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Connect With Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all ${social.hoverBorder}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${social.iconBg}`}>
                  <social.icon />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {social.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium mt-2 text-blue-600">
                    Visit <ArrowLeft className="w-3 h-3 rotate-180" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Feedback & Suggestions</h2>
          </div>
          <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              WiShare is continuously evolving. If you have ideas that can improve the experience, 
              we welcome your suggestions and feedback through our social media channels.
            </p>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Response Time</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500 leading-relaxed">
            We aim to review messages and feedback as quickly as possible. 
            Response times may vary depending on availability.
          </p>
        </div>
      </div>

      {/* Community Footer */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <Wifi className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              Thank You for Being Part of WiShare
            </h3>
            <p className="text-gray-400 text-sm">
              The WiShare Community
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2026 WiShare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;