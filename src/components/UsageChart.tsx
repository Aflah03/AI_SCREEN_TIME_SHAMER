import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyStats } from '../types';
import { format } from 'date-fns';

interface UsageChartProps {
  data: DailyStats[];
}

export const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const chartData = data.map(stat => ({
    date: format(stat.date, 'MMM dd'),
    hours: stat.totalTime / 60,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit="h" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366F1"
              fillOpacity={1}
              fill="url(#colorHours)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};