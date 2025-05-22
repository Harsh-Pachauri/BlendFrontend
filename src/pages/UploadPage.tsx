import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type.startsWith('video/')) {
      setFile(selectedFile);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type.startsWith('image/')) {
      setThumbnail(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    if (!token || !user?.username) {
      setMessage("User not logged in or missing data.");
      return;
    }

    if (!file || !title) {
      setMessage("Please provide all required fields.");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("username", user.username);
    if (thumbnail) form.append("thumbnail", thumbnail);
    if (file) form.append("video", file);

    try {
      const res = await fetch("http://localhost:8001/api/v1/videos/publish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      setMessage(data.message || "Upload failed");

      // Optional: Reset form
      if (res.ok) {
        setFile(null);
        setThumbnail(null);
        setTitle('');
        setDescription('');
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setMessage("Upload failed: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>

      <div className="space-y-6">
        {/* Video Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">
            {file ? file.name : 'Drag and drop your video here'}
          </h2>
          <p className="text-gray-500 mb-4">or</p>
          <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded">
            Select File
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Video Details */}
        {file && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border p-2 rounded min-h-[100px]"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={handleThumbnailSelect}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Save as Draft
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>

            {message && (
              <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
