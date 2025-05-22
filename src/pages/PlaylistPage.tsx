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
  const [openMenuVideoId, setOpenMenuVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get(`https://blend-backend.vercel.app//api/v1/playlists/${playlistId}`, {
        withCredentials: true,
      });
      setPlaylist(res.data.data);
    } catch (err) {
      console.error('Failed to fetch playlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    if (!playlistId) return;
    try {
      await axios.patch(
        `https://blend-backend.vercel.app//api/v1/playlists/${playlistId}/remove/${videoId}`,
        { withCredentials: true }
      );
      // Re-fetch the updated playlist
      fetchPlaylist();
    } catch (err) {
      console.error('Error removing video from playlist:', err);
    } finally {
      setOpenMenuVideoId(null); // Close menu
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="text-center py-20 text-red-500">Playlist not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
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
              <Link to={`/playlists/edit/${playlistId}`}>
                <button className="btn btn-secondary">
                  <Pencil className="w-5 h-5 mr-2" />
                  Edit
                </button>
              </Link>
            </div>
          </div>
          <p className="text-gray-700">{playlist.description}</p>
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {playlist.video.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No videos in this playlist yet.</div>
        ) : (
          playlist.video.map((video) => (
            <div
              key={video._id}
              className="relative flex gap-4 bg-gray-700 p-4 rounded-lg hover:bg-blue-800 transition"
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
                    {video.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-300">{video.channel?.name || 'Unknown Channel'}</p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <span>{video.views?.toLocaleString() || '0'} views</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(video.createdAt).toDateString()}</span>
                </div>
              </div>

              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-600 rounded-full"
                  onClick={() =>
                    setOpenMenuVideoId((prev) => (prev === video._id ? null : video._id))
                  }
                >
                  <MoreVertical className="w-5 h-5 text-white" />
                </button>

                {openMenuVideoId === video._id && (
                  <div className="absolute right-0 top-10 z-20 bg-white rounded shadow-md w-48">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => handleRemoveVideo(video._id)}
                    >
                      Remove from Playlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
