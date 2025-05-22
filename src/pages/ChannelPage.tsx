import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserPlus, UserMinus } from 'lucide-react';
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
  const { isAuthenticated } = useAuth();
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'playlists' | 'about'>('videos');

  const { user } = useAuth() as { user: User | null }; // assuming user contains _id
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!channel?._id || !user?._id) return;

      try {
        const res = await fetch(`http://localhost:8001/api/v1/subscriptions/c/${user._id}`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`, // ✅ Add this
  },
  credentials: 'include',
});
        const data = await res.json();

        const isSubbed = data.data.some((sub: any) => sub.channel._id === channel._id);
        setIsSubscribed(isSubbed);
      } catch (err) {
        console.error('Failed to check subscription status:', err);
      }
    };

    checkSubscriptionStatus();
  }, [channel, user]);

  const handleSubscriptionToggle = async () => {
    if (!user || !channel) return;

    try {
      const res = await fetch(
        `http://localhost:8001/api/v1/subscriptions/c/${user._id}/${channel._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          credentials: 'include',
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsSubscribed((prev) => !prev);
      } else {
        console.error(data.message || 'Subscription toggle failed');
      }
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchChannelData = async () => {
      try {
        const res = await fetch(`http://localhost:8001/api/v1/users/c/${username}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch channel data');

        const data = await res.json();
        const { channel, videos } = data.data;

        setChannel(channel);
        setVideos(Array.isArray(videos) ? videos : []);

        // Fetch playlists
        if (channel?._id) {
          const playlistRes = await fetch(`http://localhost:8001/api/v1/playlists/user/${channel._id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!playlistRes.ok) throw new Error('Failed to fetch playlists');
          const playlistData = await playlistRes.json();
          setPlaylists(playlistData.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChannelData();
  }, [username, isAuthenticated, navigate, authToken]);

  if (!isAuthenticated) return null;

  return (
    <div className="pb-20">
      {/* Cover Image */}
      <div className="w-full h-48 bg-gray-200 relative">
        {channel?.coverImage && (
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-900 p-6 rounded-lg shadow-md">
          {channel?.avatar && (
            <img
              src={channel.avatar}
              alt={channel.username}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {channel?.fullName} (@{channel?.username})
            </h1>
            <p className="text-gray-600 mt-1">
              {channel?.subscribersCount.toLocaleString()} subscribers
            </p>
            <p className="text-gray-500">Creating awesome content since 2020</p>
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${isSubscribed ? 'bg-gray-500' : 'bg-blue-600'}`}
            onClick={handleSubscriptionToggle}
          >
            {isSubscribed ? (
              <>
                <UserMinus className="w-5 h-5" /> Unsubscribe
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Subscribe
              </>
            )}
          </button>

        </div>

        {/* Tabs */}
        <div className="border-b mt-6">
          <nav className="flex gap-6">
            {['videos', 'playlists', 'about'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-2 font-medium capitalize ${activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                  }`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <Link
                  key={video._id}
                  to={`/watch/${video._id}`}
                  className="block bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{video.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {video.views.toLocaleString()} views •{' '}
                      {new Date(video.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <Link
                    to={`/playlists/${playlist._id}`}
                    key={playlist._id}
                    className="block bg-white rounded-lg shadow hover:shadow-lg transition"
                  >
                    <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                      🎵 Playlist
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{playlist.name}</h3>
                      <p className="text-sm text-gray-500">{playlist.description}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full py-20">
                  No playlists yet.
                </p>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="text-center text-gray-500 py-20">About section coming soon.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
