import { useEffect, useState } from 'react';
import { Play, MoreVertical, Clock } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48L2c+PC9zdmc+')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Share Your Story With The World
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Join millions of creators and viewers. Upload, share, and discover amazing videos from around the globe.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link to="/explore" className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Watching
              </Link>
              <Link to="/upload" className="rounded-lg bg-primary-500 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                Upload Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
<section className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold tracking-tight">Recent Uploads</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {videos.map((video) => (
    <div key={video._id} className="group relative">
      {/* Outer clickable thumbnail */}
      <Link to={`/watch/${video._id}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs text-white rounded">
            8:45
          </div>
        </div>

      {/* Video info - outside the clickable thumbnail */}
      <div className="mt-3">
        <h3 className="font-semibold line-clamp-2 group-hover:text-primary-600">
          {video.title}
        </h3>
        <Link to={`/c/${video.owner.username}`}className="mt-1 text-sm text-gray-400 hover:text-gray-900">
          {video.owner.username || 'Unknown Channel'}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
          <span>{video.views ?? '0'} views</span>
          <span className="mx-1">•</span>
          <span>
            {video.createdAt
              ? new Date(video.createdAt).toLocaleDateString()
              : 'Unknown date'}
          </span>
        </div>
      </div>

      {/* Save to Playlist Button */}
      <button
        onClick={() => openModal(video._id)}
        className="absolute top-2 right-2 p-1 bg-gray-600 rounded-full hover:bg-gray-100 shadow"
        >
        <MoreVertical className="w-5 h-5" />
      </button>
        </Link>
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
