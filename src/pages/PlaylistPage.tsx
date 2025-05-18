import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MoreVertical, Pencil } from 'lucide-react';

const PlaylistPage = () => {
  const { playlistId } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-96 aspect-video bg-gray-100 rounded-lg" />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Playlist Name</h1>
              <p className="text-gray-600">10 videos • Last updated 2 days ago</p>
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
          <p className="text-gray-700">
            This is a description of the playlist. It can be multiple lines long and
            provide details about what kind of videos are included.
          </p>
        </div>
      </div>

      {/* Playlist Videos */}
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <Link to={`/watch/video${i}`} className="w-48 aspect-video bg-gray-100 rounded" />
            <div className="flex-1">
              <Link to={`/watch/video${i}`}>
                <h3 className="font-semibold mb-1 hover:text-primary-600">
                  Video Title {i + 1}
                </h3>
              </Link>
              <Link to={`/c/channel${i}`} className="text-sm text-gray-600 hover:text-gray-900">
                Channel Name
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>1.2K views</span>
                <span className="mx-1">•</span>
                <span>2 days ago</span>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-full self-start">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;