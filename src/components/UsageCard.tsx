import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Smartphone } from 'lucide-react';
import { AppUsage } from '../types';

interface UsageCardProps {
  usage: AppUsage;
  onSelect: (app: AppUsage) => void;
}

export const UsageCard: React.FC<UsageCardProps> = ({ usage, onSelect }) => {
  const hours = Math.floor(usage.timeSpent / 60);
  const minutes = usage.timeSpent % 60;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
      onClick={() => onSelect(usage)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Smartphone className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{usage.app}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          usage.category === 'social' ? 'bg-red-100 text-red-600' :
          usage.category === 'productivity' ? 'bg-green-100 text-green-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          {usage.category}
        </span>
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <Clock className="w-5 h-5" />
        <span className="text-lg">
          {hours > 0 ? `${hours}h ` : ''}{minutes}m
        </span>
      </div>
    </motion.div>
  );
};