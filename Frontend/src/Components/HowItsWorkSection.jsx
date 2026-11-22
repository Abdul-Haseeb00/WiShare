import React from 'react';
import { Upload, Wifi, Users } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      step: 1,
      title: 'Upload or Enter',
      description: 'Add text, paste a link, or upload a file (up to 5MB).',
    },
    {
      icon: Wifi,
      step: 2,
      title: 'Share',
      description: 'We generate a unique share link or code for you.',
    },
    {
      icon: Users,
      step: 3,
      title: 'Receive',
      description: 'Anyone on the same WiFi can access and download instantly.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <p className="text-gray-500 text-base">
            Three simple steps to share anything instantly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-0 relative">
          
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center">
              
              {/* Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full max-w-[280px] text-center shadow-sm">
                
                {/* Icon Circle */}
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-blue-500" />
                </div>

                {/* Step Number + Title */}
                <div className="flex items-center justify-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed pl-2">
                  {item.description}
                </p>
              </div>

              {/* Dashed Arrow (between cards, not after last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 -right-6 transform translate-x-1/2 items-center">
                  <div className="flex items-center gap-0.5">
                    <span className="w-8 border-t-2 border-dashed border-gray-300" />
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      className="text-gray-300 -ml-1"
                    >
                      <path 
                        d="M6 4L10 8L6 12" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;