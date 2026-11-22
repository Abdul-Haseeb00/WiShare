import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async'
import { 
  Wifi, 
  ArrowLeft, 
  FileText, 
  Shield, 
  Scale, 
  AlertTriangle,
  UserCheck,
  HardDrive,
  Ban,
  RefreshCw,
  Mail
} from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      num: '1',
      title: 'Acceptance of Terms',
      icon: UserCheck,
      content: `By using WiShare, you acknowledge that you have read, understood, and agreed to these Terms of Use.`,
    },
    {
      num: '2',
      title: 'Service Description',
      icon: FileText,
      content: `WiShare provides a platform that allows users to share files, links, and text between devices connected to the same network. We reserve the right to modify, suspend, or discontinue any part of the service at any time.`,
    },
    {
      num: '3',
      title: 'User Responsibilities',
      icon: Shield,
      content: `You agree not to:`,
      list: [
        'Upload or share illegal content.',
        'Share malicious software, viruses, or harmful code.',
        'Violate the intellectual property rights of others.',
        'Attempt to gain unauthorized access to systems or networks.',
        'Use the service for fraudulent or unlawful purposes.',
      ],
    },
    {
      num: '4',
      title: 'Content Ownership',
      icon: HardDrive,
      content: `Users retain ownership of any content they upload or share through WiShare. You are solely responsible for the content you share and its legality.`,
    },
    {
      num: '5',
      title: 'Limitation of Liability',
      icon: Scale,
      content: `WiShare is provided on an "as is" and "as available" basis. We make no warranties regarding the reliability, availability, or accuracy of the service. To the maximum extent permitted by law, WiShare shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of the service.`,
    },
    {
      num: '6',
      title: 'Service Availability',
      icon: RefreshCw,
      content: `We do not guarantee uninterrupted access to the service and may perform maintenance, updates, or modifications without notice.`,
    },
    {
      num: '7',
      title: 'Termination',
      icon: Ban,
      content: `We reserve the right to suspend or terminate access to users who violate these Terms of Use.`,
    },
    {
      num: '8',
      title: 'Changes to Terms',
      icon: AlertTriangle,
      content: `We may update these Terms of Use periodically. Continued use of the service after changes are posted constitutes acceptance of the revised terms.`,
    },
    {
      num: '9',
      title: 'Contact Information',
      icon: Mail,
      content: `If you have questions regarding these Terms, please contact us through the methods provided on the website.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Helmet>
        <title>Terms of Use</title>
        <meta name="description" content="Read WiShare's Terms of Use to understand the rules and guidelines for using our file sharing service." />
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
            <Scale className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Terms of <span className="text-blue-600">Use</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: June 2026
          </p>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            Welcome to WiShare. By accessing or using our platform, you agree to comply with 
            and be bound by these Terms of Use.
          </p>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="space-y-4">
          {sections.map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      §{section.num}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {section.content}
                  </p>
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TermsPage;