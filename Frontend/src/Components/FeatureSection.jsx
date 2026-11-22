import React from 'react';
import { Shield, Zap, WifiOff, FileCheck } from 'lucide-react';
const WhyWiShareSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data stays on your local network. We don\'t store your files.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      strokeColor: 'stroke-green-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Transfer files and share instantly without any hassle.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      strokeColor: 'stroke-purple-500',
    },
    {
      icon: WifiOff,
      title: 'No Internet Needed',
      description: 'Works completely on the same WiFi network. No mobile data required.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      strokeColor: 'stroke-blue-500',
    },
    {
      icon: FileCheck,
      title: 'Small & Efficient',
      description: 'Share files up to 5MB quickly and efficiently without limits.',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      strokeColor: 'stroke-orange-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Why WiShare?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              {/* Icon Circle */}
              <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mb-5`}>
                <feature.icon 
                  className={`w-5 h-5 ${feature.iconColor}`} 
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 mb-2.5">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWiShareSection;