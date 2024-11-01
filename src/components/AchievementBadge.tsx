import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Achievement } from '../types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  const progress = (achievement.progress / achievement.maxProgress) * 100;
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={buildStyles({
              pathColor: achievement.unlockedAt ? '#10B981' : '#6366F1',
              textColor: '#374151',
              trailColor: '#E5E7EB',
            })}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {achievement.title}
            </h3>
            {achievement.unlockedAt && (
              <Trophy className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          {achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-1">
              Unlocked: {achievement.unlockedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};