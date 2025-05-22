import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ThumbsUp, ThumbsDown, Share2, Flag, MoreVertical, Send, Edit2, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoFile: string;
  views: number;
  likes?: number;
  createdAt: string;
  owner: {
    _id: string;
    username: string;
    avatar: string;
    subscribers?: number;
  };
}

interface Comment {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { user, isAuthenticated } = useAuth();

  const [video, setVideo] = useState<Video | null>(null);
  const [recommended, setRecommended] = useState<Video[]>([]);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!videoId) return;

    fetch(`https://blend-backend.vercel.app//api/v1/videos/${videoId}`)
      .then((res) => res.json())
      .then((data) => setVideo(data.data))
      .catch((err) => console.error('Failed to fetch video:', err));

    fetch('https://blend-backend.vercel.app//api/v1/videos')
      .then((res) => res.json())
      .then((data) => setRecommended(data.videos || []))
      .catch((err) => console.error('Failed to fetch recommended:', err));
  }, [videoId]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        id: user?.id || '',
        username: user?.username || '',
        avatar: user?.avatar || ''
      },
      content: comment,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setComments((prev) => [newComment, ...prev]);
    setComment('');
  };

  const handleEditComment = (id: string) => {
    const toEdit = comments.find((c) => c.id === id);
    if (toEdit) {
      setEditingCommentId(id);
      setEditContent(toEdit.content);
    }
  };

  const handleSaveEdit = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: editContent } : c))
    );
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleDeleteComment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? `${formatDistanceToNow(date)} ago` : 'Unknown date';
  };

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-[1920px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Left - Video and Comments */}
      <div className="lg:w-[calc(100%-384px)]">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
          <video
            controls
            src={video.videoFile}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
            <span>{video.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{formatDate(video.createdAt)}</span>
          </div>

          <div className="flex justify-between items-center border-y py-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={video.owner.avatar}
                alt={video.owner.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <Link to={`/c/${video.owner.username}`} className="font-medium hover:text-primary-600">
                  {video.owner.username}
                </Link>
                <p className="text-sm text-slate-500">
                  {video.owner.subscribers?.toLocaleString() || 0} subscribers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                <span>{video.likes?.toLocaleString() || 0}</span>
              </button>
              <button className="btn btn-secondary">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="btn btn-secondary">
                <Flag className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-sm whitespace-pre-wrap">{video.description}</p>
        </div>

        {/* Comments */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>

          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-4">
                <img src={user?.avatar} alt="You" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="input w-full mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setComment('')} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={!comment.trim()}>
                      <Send className="w-4 h-4 mr-1" />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-4">
                <img src={c.user.avatar} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex gap-2 mb-1 items-center">
                    <Link to={`/c/${c.user.username}`} className="font-medium hover:text-primary-600">
                      {c.user.username}
                    </Link>
                    <span className="text-sm text-slate-500">
                      {formatDate(c.createdAt)}
                    </span>
                  </div>
                  {editingCommentId === c.id ? (
                    <>
                      <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="input w-full mb-2"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingCommentId(null)} className="btn btn-secondary btn-sm">
                          Cancel
                        </button>
                        <button onClick={() => handleSaveEdit(c.id)} className="btn btn-primary btn-sm">
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm mb-2">{c.content}</p>
                  )}
                  <div className="flex gap-4 text-sm text-slate-600">
                    <button className="flex items-center gap-1 hover:text-primary-600">
                      <ThumbsUp className="w-4 h-4" /> {c.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    {user?.id === c.user.id && (
                      <>
                        <button onClick={() => handleEditComment(c.id)} className="flex items-center gap-1 hover:text-primary-600">
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button onClick={() => handleDeleteComment(c.id)} className="flex items-center gap-1 text-error-600">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Recommended */}
      <div className="lg:w-96">
        <h2 className="text-lg font-bold mb-4">Recommended Videos</h2>
        <div className="space-y-4">
          {recommended
            .filter((v) => v._id !== video._id)
            .map((rec) => (
              <Link key={rec._id} to={`/watch/${rec._id}`} className="flex gap-4 group">
                <div className="w-40 aspect-video bg-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={rec.thumbnail}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600">
                    {rec.title}
                  </h3>
                  <div className="text-sm text-slate-600">{rec.owner?.username}</div>
                  <div className="text-sm text-slate-500">
                    {rec.views?.toLocaleString()} views • {formatDate(rec.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
