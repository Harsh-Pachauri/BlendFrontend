import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Share2, MoreVertical, Plus } from 'lucide-react';

const TweetsPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tweets</h1>
        <Link to="/tweets/new" className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Tweet
        </Link>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Link to="/profile" className="font-semibold hover:text-primary-600">
                      John Doe
                    </Link>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      @johndoe
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      • 2h ago
                    </span>
                  </div>
                  <p className="mt-2">
                    This is a tweet about something interesting. It could be about a new
                    video, an announcement, or just thoughts. #content #creator
                  </p>
                  {i % 3 === 0 && (
                    <div className="mt-4 aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg" />
                  )}
                  <div className="flex items-center gap-6 mt-4">
                    <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600">
                      <MessageSquare className="w-5 h-5" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-error-600">
                      <Heart className="w-5 h-5" />
                      <span>142</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetsPage;