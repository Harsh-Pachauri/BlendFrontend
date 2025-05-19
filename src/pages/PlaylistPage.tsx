import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MoreVertical, Pencil } from 'lucide-react';
import axios from 'axios';

interface Video {
  _id: string;
  title: string;
  views: number;
  createdAt: string;
  thumbnail?: string;
  channel?: {
    name: string;
  };
}

interface Playlist {
  _id: string;
  name: string;
  description: string;
  video: Video[];
}

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playlistId) {
      axios
        .get(`http://localhost:8001/api/v1/playlists/${playlistId}`, { withCredentials: true })
        .then(res => {
          setPlaylist(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch playlist:', err);
          setLoading(false);
        });
    }
  }, [playlistId]);

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="text-center py-20 text-red-500">Playlist not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-96 aspect-video bg-gray-100 rounded-lg" />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
              <p className="text-gray-600">
                {playlist.video.length} {playlist.video.length === 1 ? 'video' : 'videos'} • Recently updated
              </p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary">
                <Pencil className="w-5 h-5 mr-2" />
                Edit
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-700">{playlist.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {playlist.video.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No videos in this playlist yet.</div>
        ) : (
          playlist.video.map((video, i) => (
            <div
              key={video._id}
              className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <Link to={`/watch/${video._id}`} className="w-48 aspect-video bg-gray-200 rounded overflow-hidden">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                    No Thumbnail
                  </div>
                )}
              </Link>

              <div className="flex-1">
                <Link to={`/watch/${video._id}`}>
                  <h3 className="font-semibold mb-1 hover:text-primary-600">
                    {video.title || `Video Title ${i + 1}`}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">
                  {video.channel?.name || 'Unknown Channel'}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{video.views?.toLocaleString() || '0'} views</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(video.createdAt).toDateString()}</span>
                </div>
              </div>

              <button className="p-1 hover:bg-gray-100 rounded-full self-start">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
