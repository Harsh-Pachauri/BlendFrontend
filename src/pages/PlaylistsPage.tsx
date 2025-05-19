import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Playlist {
  _id: string;
  name: string;
  description: string;
  video: any[]; // Update with actual video type if available
}

interface PlaylistForm {
  name: string;
  description: string;
}

const PlaylistsPage = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<PlaylistForm>({ name: '', description: '' });

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8001/api/v1/playlists/user/${user.id}`, { withCredentials: true })
        .then(res => setPlaylists(res.data.data))
        .catch(err => console.error('Failed to load playlists:', err));
    }
  }, [user]);

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert('name is required');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8001/api/v1/playlists`,
        formData,
        { withCredentials: true }
      );
      setPlaylists(prev => [res.data.data, ...prev]);
      setShowCreateModal(false);
      setFormData({ name: '', description: '' });
    } catch (err) {
      console.error('Create playlist error:', err);
      alert('Failed to create playlist.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="bg-white rounded-lg shadow-sm hover:shadow-md">
            <Link to={`/playlists/${playlist._id}`}>
              <div className="aspect-video bg-gray-100 relative">
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-sm px-2 py-1 rounded">
                  {playlist.video.length} videos
                </div>
              </div>
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <Link to={`/playlists/${playlist._id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1">{playlist.name}</h3>
                </Link>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Last updated recently</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Playlist</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="input w-full"
                placeholder="Enter playlist name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <textarea
                className="input w-full min-h-[100px]"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex justify-end gap-4">
                <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
