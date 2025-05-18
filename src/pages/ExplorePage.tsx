import React from 'react';
import { mockApi } from '../api/mockApi';

const ExplorePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Categories */}
        {['Gaming', 'Music', 'Education', 'Technology', 'Travel', 'Sports', 'News', 'Entertainment'].map((category) => (
          <div
            key={category}
            className="relative group overflow-hidden rounded-xl aspect-video cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <img
              src={`https://source.unsplash.com/featured/?${category.toLowerCase()}`}
              alt={category}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white">{category}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Videos */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Trending Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="aspect-video bg-slate-100 dark:bg-slate-700" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Video Title</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Channel Name</p>
                <div className="flex items-center mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>1.2K views</span>
                  <span className="mx-1">•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;