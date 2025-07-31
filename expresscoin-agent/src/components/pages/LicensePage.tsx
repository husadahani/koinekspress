'use client';

import { FaStar, FaCrown, FaGem, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockLicenses } from '@/data/mockData';

export default function LicensePage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star': return FaStar;
      case 'crown': return FaCrown;
      case 'gem': return FaGem;
      default: return FaStar;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          border: 'border-gray-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-fedex-purple',
          button: 'bg-fedex-purple hover:bg-fedex-dark',
          border: 'border-fedex-purple'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700',
          border: 'border-yellow-400'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fedex-purple">Lisensi Agent</h1>
        <p className="text-gray-600">Pilih lisensi yang sesuai dengan kebutuhan Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLicenses.map((license, index) => {
          const IconComponent = getIcon(license.icon);
          const colorClasses = getColorClasses(license.color);
          
          return (
            <motion.div
              key={license.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`card bg-base-100 shadow-lg border-2 ${colorClasses.border} relative`}
            >
              {license.popular && (
                <div className="badge badge-secondary absolute top-4 right-4">Popular</div>
              )}
              
              <div className="card-body">
                <div className="text-center">
                  <div className={`w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`text-2xl ${colorClasses.text}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold ${colorClasses.text}`}>
                    {license.name}
                  </h3>
                  
                  <div className="text-3xl font-bold my-4">
                    ${license.price} USDT
                  </div>
                  
                  <ul className="text-left space-y-2 text-sm">
                    {license.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <FaCheck className="inline text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`btn btn-primary ${colorClasses.button} border-none w-full mt-4`}>
                    Beli Lisensi
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}