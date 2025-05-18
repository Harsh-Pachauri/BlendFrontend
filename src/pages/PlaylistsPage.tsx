import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical } from 'lucide-react';

const PlaylistsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Placeholder playlists */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <Link to={`/playlists/${i}`}>
              <div className="aspect-video bg-gray-100 relative">
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-sm px-2 py-1 rounded">
                  10 videos
                </div>
              </div>
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <Link to={`/playlists/${i}`}>
                  <h3 className="font-semibold text-gray-900 mb-1">Playlist Name</h3>
                </Link>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Last updated 2 days ago</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Playlist</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="input" placeholder="Enter playlist name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="input min-h-[100px]"
                  placeholder="Enter playlist description"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;