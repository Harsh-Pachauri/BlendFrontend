import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Trash2 } from 'lucide-react';

const EditPlaylistPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPrivate: false,
  });

  useEffect(() => {
    // TODO: Fetch playlist data
  }, [playlistId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement playlist update
    navigate(`/playlists/${playlistId}`);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this playlist?')) {
      // TODO: Implement playlist deletion
      navigate('/playlists');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Playlist</h1>
        <button
          onClick={handleDelete}
          className="btn bg-error-50 text-error-600 hover:bg-error-100"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Playlist
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            className="input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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