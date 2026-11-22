import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Wifi, 
  Rocket, 
  Shield, 
  Zap, 
  Globe, 
  FileText, 
  Link2, 
  MessageSquare, 
  ArrowRight,
  Users,
  Target,
  Eye,
  Heart
} from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'File Sharing',
      desc: 'Upload and share files quickly with devices connected to the same network.',
    },
    {
      icon: Link2,
      title: 'Link Sharing',
      desc: 'Send website URLs and resources without copying them manually.',
    },
    {
      icon: MessageSquare,
      title: 'Text Sharing',
      desc: 'Share notes, code snippets, and messages instantly.',
    },
    {
      icon: Zap,
      title: 'Fast Access',
      desc: 'Recipients can access shared content immediately through a generated link.',
    },
  ];

  const stats = [
    { value: '5MB', label: 'Max File Size' },
    { value: '0s', label: 'Setup Time' },
    { value: '100%', label: 'Free to Use' },
    { value: 'WiFi', label: 'Only Requirement' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
        <Helmet>
          <title>About WiShare</title>
          <meta name="description" content="Learn more about WiShare and our mission to simplify local file sharing." />
        </Helmet>
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            <Wifi className="w-4 h-4" />
            About WiShare
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Share Files Instantly,{' '}
            <span className="text-blue-600">Without the Hassle</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            WiShare is a simple platform designed to make sharing files, links, and text 
            effortless between devices connected to the same Wi-Fi network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/share')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Rocket className="w-4 h-4" />
              Start Sharing
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Our mission is to simplify local file sharing by creating a secure, lightweight, 
            and user-friendly platform that anyone can use within seconds. We believe that 
            transferring files should be as easy as connecting to Wi-Fi.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 sm:pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why WiShare Section */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold mb-4">
              <Heart className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Why <span className="text-blue-600">WiShare</span>?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Traditional file sharing methods often require email attachments, cloud uploads, 
              USB drives, or third-party applications. WiShare eliminates these obstacles.
            </p>
          </div>

          <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6 sm:p-8">
            <ul className="space-y-4">
              {[
                'Share files up to 5MB instantly',
                'Transfer links and text with ease',
                'Access shared content through a simple URL',
                'Connect devices on the same Wi-Fi network',
                'Enjoy a clean and intuitive experience',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5" />
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            What We <span className="text-blue-600">Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <feature.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              We aim to continue improving WiShare by introducing larger file support, enhanced 
              security, device discovery features, and seamless cross-platform experiences.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Our goal is to become the simplest local sharing solution for students, professionals, 
              and everyday users.
            </p>
          </div>
        </div>
      </div>

      {/* CTA / Join Us Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-blue-300 rounded-lg text-xs font-semibold mb-5">
              <Users className="w-3.5 h-3.5" />
              Join Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Sharing Smarter
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
              No cables. No complicated setup. Just connect and share. 
              Experience the easiest way to transfer files locally.
            </p>
            <button
              onClick={() => navigate('/share')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
            >
              <Rocket className="w-4 h-4" />
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;