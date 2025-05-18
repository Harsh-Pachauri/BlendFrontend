import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const WatchHistoryPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Watch History</h1>
        <button className="btn btn-secondary">
          <Trash2 className="w-5 h-5 mr-2" />
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <Link to={`/watch/video${i}`} className="w-48 aspect-video bg-gray-100 rounded" />
            <div className="flex-1">
              <Link to={`/watch/video${i}`}>
                <h3 className="font-semibold mb-1 hover:text-primary-600">
                  Video Title {i + 1}
                </h3>
              </Link>
              <Link to={`/c/channel${i}`} className="text-sm text-gray-600 hover:text-gray-900">
                Channel Name
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>1.2K views</span>
                <span className="mx-1">•</span>
                <span>Watched 2 days ago</span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full self-start">
              <Trash2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistoryPage;