import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ✅ Corrected import path
import { Link } from 'react-router-dom';

interface Channel {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
}

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  views: number;
  createdAt: string;
}

const ChannelPage = () => {
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated } = useAuth(); // ✅ Add token if available
  const authToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect if not authenticated
      navigate('/login');
      return;
    }

    const fetchChannelData = async () => {
      try {
        const res = await fetch(`http://localhost:8001/api/v1/users/c/${username}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // ✅ Use token if backend requires it
          },
          credentials: 'include', // include cookies if needed
        });

        if (!res.ok) {
          throw new Error('Failed to fetch channel data');
        }

const data = await res.json();
console.log(data);
setChannel(data.data.channel);
console.log(channel)
setVideos(Array.isArray(data.data.videos) ? data.data.videos : []);

      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    fetchChannelData();
  }, [username, isAuthenticated, navigate, authToken]);

  if (!isAuthenticated) return null; // Optionally show spinner or message

  return (
    <div>
      {/* Channel Header */}
      <div className="relative h-48 bg-gray-200">
        {channel && (
          <img
            src={channel.coverImage}
            alt="Channel Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Channel Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 -mt-16 mb-8">
          {channel && (
            <img
              src={channel.avatar}
              alt={channel.username}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          )}

          <div className="flex-1 pt-4 md:pt-0">
            <h1 className="text-2xl font-bold mb-2">
              {channel?.fullName} (@{channel?.username})
            </h1>
            <p className="text-gray-600 mb-2">
              {channel?.subscribersCount.toLocaleString()} subscribers
            </p>
            <p className="text-gray-600">Creating awesome content since 2020</p>
          </div>

          <button
            className={`btn ${isSubscribed ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsSubscribed(!isSubscribed)}
          >
            {isSubscribed ? (
              <>
                <UserMinus className="w-5 h-5 mr-2" />
                Unsubscribe
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Subscribe
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex gap-6">
            {['videos', 'playlists', 'about'].map((tab) => (
              <button
                key={tab}
                className={`pb-4 px-2 font-medium ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Video Grid */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <Link key={video._id} to={`/watch/${video._id}`}>
                <div className="aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{video.views.toLocaleString()} views</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="text-center text-gray-500 py-20">No playlists yet.</div>
        )}
        {activeTab === 'about' && (
          <div className="text-center text-gray-500 py-20">About section coming soon.</div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
