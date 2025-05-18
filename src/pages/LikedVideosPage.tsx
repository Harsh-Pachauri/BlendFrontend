import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';

const LikedVideosPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ThumbsUp className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold">Liked Videos</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            <Link
              to={`/watch/video${i}`}
              className="w-48 aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"
            >
              {/* Video thumbnail */}
            </Link>
            
            <div className="flex-1">
              <Link to={`/watch/video${i}`}>
                <h3 className="font-semibold mb-1 hover:text-primary-600">
                  Video Title {i + 1}
                </h3>
              </Link>
              
              <Link
                to={`/c/channel${i}`}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Channel Name
              </Link>
              
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                <span>1.2K views</span>
                <span>•</span>
                <span>2 days ago</span>
              </div>
              
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                This is a brief description of the video that provides context about its content.
                It can span multiple lines but will be truncated after two lines.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideosPage;