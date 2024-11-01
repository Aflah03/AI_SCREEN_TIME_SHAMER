import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface ShamingMessageProps {
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export const ShamingMessage: React.FC<ShamingMessageProps> = ({ message, severity }) => {
  const bgColor = {
    low: 'bg-yellow-50 border-yellow-200',
    medium: 'bg-orange-50 border-orange-200',
    high: 'bg-red-50 border-red-200',
  }[severity];

  const textColor = {
    low: 'text-yellow-800',
    medium: 'text-orange-800',
    high: 'text-red-800',
  }[severity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`rounded-lg p-6 border-2 ${bgColor} shadow-lg`}
      >
        <div className="flex items-start space-x-3">
          <MessageSquare className={`w-6 h-6 ${textColor}`} />
          <div>
            <p className={`text-lg font-medium ${textColor}`}>
              {message}
            </p>
            <p className={`text-sm mt-1 ${textColor} opacity-75`}>
              {severity === 'high' ? "Maybe it's time for a digital detox?" :
               severity === 'medium' ? "There's still hope for you!" :
               "You're doing... okay-ish?"}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};