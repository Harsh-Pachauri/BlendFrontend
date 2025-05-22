import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const NewPlaylistPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://blend-backend.vercel.app//api/v1/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies for auth if needed
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create playlist');
      }

      const data = await response.json();
      navigate(`/playlists/${data.data._id}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to create playlist.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Playlist</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            name
          </label>
          <input
            id="name"
            type="text"
            required
            className="input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter playlist name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="input min-h-[100px]"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter playlist description"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            className="form-checkbox"
          />
          <label htmlFor="isPrivate" className="text-sm font-medium">
            Make this playlist private
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/playlists')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlaylistPage;
