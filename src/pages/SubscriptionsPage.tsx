import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Subscriptions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder subscribed channels */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Link
            key={i}
            to={`/c/channel${i}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={`https://images.pexels.com/photos/${220453 + i}/pexels-photo-${220453 + i}.jpeg`}
              alt={`Channel ${i + 1}`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold mb-1">Channel Name</h3>
              <p className="text-sm text-gray-600">1.2M subscribers</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;