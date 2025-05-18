import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Edit, Trash2, Eye, ThumbsUp, MessageSquare } from 'lucide-react';

const VideosPage = () => {
  const [filter, setFilter] = useState('all'); // all, published, drafts

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
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all'
              ? 'bg-primary-50 text-primary-600'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          onClick={() => setFilter('all')}
        >
          All Videos
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'published'
              ? 'bg-primary-50 text-primary-600'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          onClick={() => setFilter('published')}
        >
          Published
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'drafts'
              ? 'bg-primary-50 text-primary-600'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          onClick={() => setFilter('drafts')}
        >
          Drafts
        </button>
      </div>

      {/* Videos List */}
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
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-40 aspect-video bg-slate-100 dark:bg-slate-700 rounded" />
                      <div>
                        <h3 className="font-medium">Video Title {i + 1}</h3>
                        <p className="text-sm text-slate-500">video-id-{i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">Mar 1, 2024</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>1.2K</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-slate-400" />
                      <span>234</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      <span>45</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/edit/${i}`}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-error-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;