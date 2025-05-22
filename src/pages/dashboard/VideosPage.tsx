import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes?: number;
  commentsCount?: number;
  createdAt: string;
  visibility: 'public' | 'private' | 'unlisted';
}

const VideosPage = () => {
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all');
  const { user } = useAuth();
  const authToken = localStorage.getItem('accessToken');

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.username) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(`http://localhost:8001/api/v1/users/c/${user.username}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideos(Array.isArray(data.data.videos) ? data.data.videos : []);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user?.username, authToken]);

  const togglePublish = async (videoId: string) => {
    try {
      const res = await fetch(`http://localhost:8001/api/v1/videos/${videoId}/toggle-publish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: 'include',
      });
      console.log(videoId)
      if (!res.ok) throw new Error('Failed to toggle publish status');
      const data = await res.json();

      // Optimistically update UI
      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId
            ? {
                ...video,
                visibility: video.visibility === 'public' ? 'private' : 'public',
              }
            : video
        )
      );
    } catch (err) {
      console.error(err);
      alert('Could not update publish status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Your Videos</h1>
        <Link to="/upload" className="btn btn-primary">
          <Upload className="w-5 h-5 mr-2" />
          Upload Video
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {(['all', 'published', 'drafts'] as const).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === type
                ? 'bg-primary-50 text-primary-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setFilter(type)}
          >
            {type === 'all' ? 'All Videos' : type === 'published' ? 'Published' : 'Drafts'}
          </button>
        ))}
      </div>

      {/* Videos Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900">
                <th className="px-6 py-3 text-left text-sm font-semibold">Video</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Visibility</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Views</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Likes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Comments</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td className="px-6 py-4" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              ) : (
                videos
                  .filter((video) => {
                    if (filter === 'published') return video.visibility === 'public';
                    if (filter === 'drafts') return video.visibility !== 'public';
                    return true;
                  })
                  .map((video) => (
                    <tr key={video._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-40 aspect-video object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium">{video.title}</h3>
                            <p className="text-sm text-slate-500">{video._id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">
                        <button
                          className={`text-xs px-2 py-1 rounded font-semibold ${
                            video.visibility === 'public'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                          onClick={() => togglePublish(video._id)}
                        >
                          if(video.isPublished=='true'){

                          }
                          {video.visibility}
                        </button>
                      </td>
                      <td className="px-6 py-4">{new Date(video.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{video.views?.toLocaleString?.() || 0}</td>
                      <td className="px-6 py-4">{video.likes?.toLocaleString?.() || 0}</td>
                      <td className="px-6 py-4">{video.commentsCount?.toLocaleString?.() || 0}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Link to={`/watch/${video._id}`}>
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link to={`/edit-video/${video._id}`}>
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button>
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
