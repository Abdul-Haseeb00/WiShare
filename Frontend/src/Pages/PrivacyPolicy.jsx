import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async'
import { 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  Database, 
  FileLock2,
  ExternalLink,
  Cookie,
  Baby,
  RefreshCw,
  Mail
} from 'lucide-react';

const PrivacyPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      num: '1',
      title: 'Information We Collect',
      icon: Eye,
      content: `Depending on how the service is used, we may collect:`,
      list: [
        'Information you provide when using the platform.',
        'Uploaded files, links, and text shared through the service.',
        'Technical information such as browser type, device information, and network-related data.',
        'Usage analytics that help improve the service.',
      ],
    },
    {
      num: '2',
      title: 'How We Use Information',
      icon: Database,
      content: `We may use collected information to:`,
      list: [
        'Provide and maintain the service.',
        'Improve performance and user experience.',
        'Monitor system security and prevent abuse.',
        'Respond to support requests.',
      ],
    },
    {
      num: '3',
      title: 'File and Content Handling',
      icon: FileLock2,
      content: `Files, links, and text shared through WiShare are processed solely for the purpose of enabling sharing functionality. Users are responsible for ensuring they do not upload sensitive, confidential, or unlawful content.`,
    },
    {
      num: '4',
      title: 'Data Security',
      icon: ShieldCheck,
      content: `We implement reasonable security measures to protect information from unauthorized access, disclosure, or misuse. However, no method of electronic transmission or storage can be guaranteed to be completely secure.`,
    },
    {
      num: '5',
      title: 'Third-Party Services',
      icon: ExternalLink,
      content: `WiShare may use third-party services such as hosting providers, analytics tools, or infrastructure providers to operate the platform. These providers may process information as necessary to deliver their services.`,
    },
    {
      num: '6',
      title: 'Cookies and Analytics',
      icon: Cookie,
      content: `The website may use cookies or similar technologies to improve functionality and understand user interactions. Users can manage cookie preferences through their browser settings.`,
    },
    {
      num: '7',
      title: "Children's Privacy",
      icon: Baby,
      content: `WiShare is not intended for children under the age required by applicable laws. We do not knowingly collect personal information from children.`,
    },
    {
      num: '8',
      title: 'Changes to This Privacy Policy',
      icon: RefreshCw,
      content: `We may update this Privacy Policy from time to time. Updated versions will be posted on this page.`,
    },
    {
      num: '9',
      title: 'Contact Us',
      icon: Mail,
      content: `If you have questions regarding this Privacy Policy, please contact us through the contact information provided on the website.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
        <Helmet>
            <title>Privacy Policy</title>
            <meta name="description" content="Read WiShare's Privacy Policy to understand how we collect, use, and protect your information while using our file sharing service." />
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
            <ShieldCheck className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Privacy <span className="text-blue-600">Policy</span>
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
            At WiShare, we value your privacy and are committed to protecting your information.
          </p>
        </div>
      </div>

      {/* Privacy Sections */}
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

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2026 WiShare. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;