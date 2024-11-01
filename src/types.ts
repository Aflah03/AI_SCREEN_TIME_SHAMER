export interface AppUsage {
  app: string;
  timeSpent: number;
  category: 'social' | 'productivity' | 'entertainment' | 'gaming';
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface DailyStats {
  date: Date;
  totalTime: number;
  breakdown: AppUsage[];
}