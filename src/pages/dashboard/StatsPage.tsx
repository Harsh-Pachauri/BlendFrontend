import React from 'react';
import { LineChart, BarChart, Activity, Users, PlaySquare, ThumbsUp } from 'lucide-react';

const StatsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Channel Statistics</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Views</h3>
            <Activity className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold">124.5K</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            +15% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Subscribers</h3>
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold">1.2K</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            +25 this week
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Videos</h3>
            <PlaySquare className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            3 uploaded this month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Likes</h3>
            <ThumbsUp className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold">8.5K</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            +500 this month
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Views Over Time</h3>
            <LineChart className="w-6 h-6 text-slate-400" />
          </div>
          <div className="h-64 bg-slate-50 dark:bg-slate-900 rounded-lg">
            {/* Chart placeholder */}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Videos</h3>
            <BarChart className="w-6 h-6 text-slate-400" />
          </div>
          <div className="h-64 bg-slate-50 dark:bg-slate-900 rounded-lg">
            {/* Chart placeholder */}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Event</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Video</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Views</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-sm">New subscriber</td>
                    <td className="px-6 py-4 text-sm">Video Title</td>
                    <td className="px-6 py-4 text-sm">1.2K</td>
                    <td className="px-6 py-4 text-sm">2 hours ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;