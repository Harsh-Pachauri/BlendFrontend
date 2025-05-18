import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, PlaySquare, ListVideo, History, Settings } from 'lucide-react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <Link to="/upload" className="btn btn-primary">
          <Upload className="w-5 h-5 mr-2" />
          Upload Video
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold">12.5K</p>
          <p className="text-sm text-gray-600 mt-1">+15% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Subscribers</h3>
          <p className="text-3xl font-bold">1.2K</p>
          <p className="text-sm text-gray-600 mt-1">+25 this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Videos</h3>
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm text-gray-600 mt-1">3 uploaded this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Watch Time</h3>
          <p className="text-3xl font-bold">856h</p>
          <p className="text-sm text-gray-600 mt-1">Last 28 days</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="border-b mb-6">
        <nav className="flex gap-6">
          <button
            className={`pb-4 px-2 font-medium flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('videos')}
          >
            <PlaySquare className="w-5 h-5" />
            Videos
          </button>
          <button
            className={`pb-4 px-2 font-medium flex items-center gap-2 ${
              activeTab === 'playlists'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('playlists')}
          >
            <ListVideo className="w-5 h-5" />
            Playlists
          </button>
          <button
            className={`pb-4 px-2 font-medium flex items-center gap-2 ${
              activeTab === 'history'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <History className="w-5 h-5" />
            Watch History
          </button>
          <button
            className={`pb-4 px-2 font-medium flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="w-48 aspect-video bg-gray-100 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Video Title {i + 1}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Published on March 1, 2024
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>1.2K views</span>
                  <span>24 likes</span>
                  <span>8 comments</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Link
                  to={`/edit/video${i}`}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </Link>
                <button className="btn btn-error btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link
              key={i}
              to={`/playlists/${i}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-video bg-gray-100" />
              <div className="p-4">
                <h3 className="font-semibold mb-1">Playlist Name</h3>
                <p className="text-sm text-gray-600">10 videos</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Link
              key={i}
              to={`/watch/video${i}`}
              className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="w-48 aspect-video bg-gray-100 rounded" />
              <div>
                <h3 className="font-semibold mb-1">Video Title {i + 1}</h3>
                <p className="text-sm text-gray-600">Channel Name</p>
                <p className="text-sm text-gray-500 mt-1">Watched 2 days ago</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Channel Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Channel Name
              </label>
              <input type="text" className="input" defaultValue="Your Channel" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Channel Description
              </label>
              <textarea
                className="input min-h-[100px]"
                defaultValue="Your channel description..."
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;