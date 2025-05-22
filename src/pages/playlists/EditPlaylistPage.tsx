import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Trash2 } from 'lucide-react';

const EditPlaylistPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
  });

useEffect(() => {
  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`https://blend-backend.vercel.app//api/v1/playlists/${playlistId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlist');
      }

      const result = await response.json();
      const { name, description, isPrivate } = result.data;
      setFormData({ name, description, isPrivate });
    } catch (err) {
      console.error(err);
      alert('Error loading playlist data.');
    }
  };

  if (playlistId) fetchPlaylist();
}, [playlistId]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch(`https://blend-backend.vercel.app//api/v1/playlists/${playlistId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update playlist');
    }

    navigate(`/playlists/${playlistId}`);
  } catch (error) {
    console.error(error);
    alert('Failed to update playlist.');
  }
};


  const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this playlist?')) {
    try {
      const response = await fetch(`https://blend-backend.vercel.app//api/v1/playlists/${playlistId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete playlist');
      }

      navigate('/playlists');
    } catch (error) {
      console.error(error);
      alert('Failed to delete playlist.');
    }
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Playlist</h1>
        <button
          onClick={handleDelete}
          className="btn bg-red-500 text-error-600 hover:bg-error-100"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Playlist
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            className="input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="input min-h-[100px]"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            onClick={() => navigate(`/playlists/${playlistId}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlaylistPage;