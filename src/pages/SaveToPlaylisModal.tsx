import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  isCreator: boolean;
  fullName?: string;
}


const SaveToPlaylistModal = ({ videoId, onClose }: { videoId: string; onClose: () => void }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth() as { user: User | null; isAuthenticated: boolean };

  console.log('hsbdv')
  console.log(user)
  console.log('njjk')

  useEffect(() => {
    axios
      .get(`https://blend-backend.vercel.app//api/v1/playlists/user/${user?._id}`, { withCredentials: true })
      .then((res) => setPlaylists(res.data.data))
      .catch(() => alert('Failed to fetch playlists'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      await axios.patch(
        `https://blend-backend.vercel.app//api/v1/playlists/${playlistId}/add/${videoId}`,
        { videoId },
        { withCredentials: true }
      );
      alert('Video added to playlist!');
      onClose();
    } catch (err) {
      alert('Failed to add video.');
    }
  };

return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Save to Playlist</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading playlists...</div>
      ) : playlists.length > 0 ? (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition"
              onClick={() => handleAddToPlaylist(playlist._id)}
            >
              <span className="text-gray-700 font-medium">{playlist.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          No playlists found.{' '}
          <a href="/playlists/new" className="text-blue-600 underline hover:text-blue-800">
            Create one
          </a>
        </p>
      )}

      {/* Cancel button */}
      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

};

export default SaveToPlaylistModal;
