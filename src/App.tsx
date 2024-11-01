import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Award, TrendingUp, Frown } from 'lucide-react';
import { UsageCard } from './components/UsageCard';
import { AchievementBadge } from './components/AchievementBadge';
import { UsageChart } from './components/UsageChart';
import { ShamingMessage } from './components/ShamingMessage';
import type { AppUsage, Achievement, DailyStats } from './types';

// Mock data - In a real app, this would come from a backend
const mockUsage: AppUsage[] = [
  { app: "Instagram", timeSpent: 185, category: "social", icon: "instagram" },
  { app: "TikTok", timeSpent: 240, category: "social", icon: "tiktok" },
  { app: "Netflix", timeSpent: 160, category: "entertainment", icon: "netflix" },
  { app: "Slack", timeSpent: 120, category: "productivity", icon: "slack" },
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Scroll Master",
    description: "Spent 4+ hours on social media in one day",
    icon: "scroll",
    progress: 240,
    maxProgress: 240,
    unlockedAt: new Date(),
  },
  {
    id: "2",
    title: "Digital Hermit",
    description: "Avoided human contact for 12 hours straight",
    icon: "hermit",
    progress: 8,
    maxProgress: 12,
  },
];

const mockDailyStats: DailyStats[] = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  totalTime: Math.random() * 400 + 200,
  breakdown: mockUsage,
}));

function App() {
  const [selectedApp, setSelectedApp] = useState<AppUsage | null>(null);
  const [shamingMessage, setShamingMessage] = useState<string>("");
  
  useEffect(() => {
    if (selectedApp) {
      const messages = [
        "Oh look, another hour wasted on social media. Your ancestors would be so proud!",
        "Netflix and no chill? That's a lot of time spent alone...",
        "Wow, you're really committed to avoiding real-life interactions, aren't you?",
      ];
      setShamingMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [selectedApp]);

  const totalDailyTime = mockUsage.reduce((acc, curr) => acc + curr.timeSpent, 0);
  const severity = totalDailyTime > 480 ? 'high' : totalDailyTime > 240 ? 'medium' : 'low';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Smartphone className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Screen Time Shamer</h1>
          </div>
          <p className="text-gray-600">Because sometimes you need an AI to judge your life choices.</p>
        </motion.div>

        {shamingMessage && (
          <div className="mb-8">
            <ShamingMessage message={shamingMessage} severity={severity} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockUsage.map((usage, index) => (
            <UsageCard
              key={usage.app}
              usage={usage}
              onSelect={setSelectedApp}
            />
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Your "Achievements"</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAchievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Usage Analytics</h2>
          </div>
          <UsageChart data={mockDailyStats} />
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>Remember: Time you enjoy wasting isn't wasted time... or is it? 🤔</p>
        </footer>
      </div>
    </div>
  );
}

export default App;