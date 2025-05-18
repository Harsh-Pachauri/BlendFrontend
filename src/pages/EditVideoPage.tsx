import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditVideoPage = () => {
  const { videoId } = useParams();
  const [isPublished, setIsPublished] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Video</h1>
        <button className="btn btn-error">Delete Video</button>
      </div>

      <div className="space-y-6">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
          {/* Video preview */}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" className="input" placeholder="Enter video title" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="input min-h-[100px]"
              placeholder="Enter video description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input type="file" accept="image/*" className="input" />
          </div>

          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isPublished}
                onChange={() => setIsPublished(!isPublished)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ml-3 text-sm font-medium">Published</span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideoPage;