import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Image, X, Save, Trash2 } from 'lucide-react';

const EditTweetPage = () => {
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch tweet data
  }, [tweetId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tweet update
    navigate('/tweets');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this tweet?')) {
      // TODO: Implement tweet deletion
      navigate('/tweets');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Tweet</h1>
        <button
          onClick={handleDelete}
          className="btn bg-error-50 text-error-600 hover:bg-error-100"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Tweet
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            className="input min-h-[150px]"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-[300px] rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            <label className="btn btn-secondary cursor-pointer">
              <Image className="w-5 h-5 mr-2" />
              Add Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/tweets')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!content.trim()}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTweetPage;