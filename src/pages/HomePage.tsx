import { useEffect, useState } from 'react';
import { Play, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import SaveToPlaylistModal from './SaveToPlaylisModal';

type Video = {
  _id: string;
  thumbnail: string;
  title: string;
  channelName?: string;
  views?: number;
  createdAt?: string;
  owner: {
    _id: string;
    username: string;
    avatar?: string;
    fullName?: string;
  };
};

const Homepage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://blend-backend.vercel.app/api/v1/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  const openModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVideoId(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="absolute inset-0 bg-[url('https://drawingsof.com/wp-content/uploads/2022/12/BluePurple.png')] bg-cover bg-center opacity-40 z-0"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Share Your Story With The World
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto relative z-10">
            Upload, share, and discover amazing videos from creators around the globe.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-white/90 transition">
              <Play className="w-5 h-5 mr-2" />
              Start Watching
            </button>
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition">
              Upload Video
            </button>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="space-y-6 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Featured Videos</h2>
          <button className="text-blue-600 hover:text-blue-500">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="relative">
              <Link to={`/watch/${video._id}`}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {video.owner.username || 'Unknown Channel'}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span>{video.views ?? '0'} views</span>
                      <span className="mx-1">•</span>
                      <span>
                        {video.createdAt
                          ? new Date(video.createdAt).toLocaleDateString()
                          : 'Unknown date'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Save to Playlist Button */}
              <button
                onClick={() => openModal(video._id)}
                className="absolute top-2 right-2 p-1 bg-gray-600 rounded-full hover:bg-gray-100 shadow"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Save to Playlist Modal */}
      {showModal && selectedVideoId && (
        <SaveToPlaylistModal videoId={selectedVideoId} onClose={closeModal} />
      )}
    </div>
  );
};

export default Homepage;
