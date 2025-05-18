import { videos, channels, playlists, watchHistory } from './mockData';
import type { Video, Channel, Playlist } from './mockData';

// Helper to simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Mock API functions
export const mockApi = {
  // Video related endpoints
  videos: {
    getAll: async (): Promise<Video[]> => {
      await simulateDelay();
      return [...videos];
    },
    
    getById: async (videoId: string): Promise<Video | null> => {
      await simulateDelay();
      return videos.find(video => video.id === videoId) || null;
    },
    
    search: async (query: string): Promise<Video[]> => {
      await simulateDelay();
      return videos.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) || 
        video.description.toLowerCase().includes(query.toLowerCase())
      );
    },
    
    publish: async (videoData: Partial<Video>): Promise<Video> => {
      await simulateDelay();
      // In a real API, this would create a new video
      return {
        id: `video-${Date.now()}`,
        title: videoData.title || 'Untitled Video',
        description: videoData.description || '',
        thumbnailUrl: videoData.thumbnailUrl || 'https://via.placeholder.com/640x360',
        videoUrl: videoData.videoUrl || '',
        duration: videoData.duration || 0,
        views: 0,
        likes: 0,
        publishedAt: new Date().toISOString(),
        isPublished: true,
        creator: {
          id: 'user-123', // Using mock authenticated user
          username: 'johnsmith',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
      };
    },
    
    update: async (videoId: string, videoData: Partial<Video>): Promise<Video> => {
      await simulateDelay();
      // In a real API, this would update an existing video
      const video = videos.find(v => v.id === videoId);
      if (!video) throw new Error('Video not found');
      
      return { ...video, ...videoData };
    },
    
    delete: async (videoId: string): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would delete a video
      return true;
    },
    
    togglePublish: async (videoId: string): Promise<Video> => {
      await simulateDelay();
      const video = videos.find(v => v.id === videoId);
      if (!video) throw new Error('Video not found');
      
      return { ...video, isPublished: !video.isPublished };
    },
  },
  
  // Channel related endpoints
  channels: {
    getByUsername: async (username: string): Promise<Channel | null> => {
      await simulateDelay();
      return channels.find(channel => channel.username === username) || null;
    },
    
    getSubscribers: async (channelId: string): Promise<number> => {
      await simulateDelay();
      const channel = channels.find(c => c.id === channelId);
      return channel ? channel.subscriberCount : 0;
    },
    
    toggleSubscribe: async (channelId: string): Promise<boolean> => {
      await simulateDelay();
      const channel = channels.find(c => c.id === channelId);
      if (!channel) throw new Error('Channel not found');
      
      // Toggle subscription (in a real API this would add/remove from user's subscriptions)
      return !channel.isSubscribed;
    },
  },
  
  // User related endpoints
  users: {
    getSubscriptions: async (userId: string): Promise<Channel[]> => {
      await simulateDelay();
      // Return channels the user is subscribed to
      return channels.filter(channel => channel.isSubscribed);
    },
    
    updateAccount: async (userData: Partial<any>): Promise<any> => {
      await simulateDelay();
      // In a real API, this would update user account details
      return { success: true };
    },
    
    updateAvatar: async (file: File): Promise<string> => {
      await simulateDelay();
      // Simulate avatar upload - return a URL
      return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    },
    
    updateCoverImage: async (file: File): Promise<string> => {
      await simulateDelay();
      // Simulate cover image upload - return a URL
      return 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    },
    
    changePassword: async (currentPassword: string, newPassword: string): Promise<boolean> => {
      await simulateDelay();
      // Simulate password change
      return true;
    },
  },
  
  // Playlist related endpoints
  playlists: {
    getAll: async (userId: string): Promise<Playlist[]> => {
      await simulateDelay();
      // Return playlists for a specific user
      return [...playlists];
    },
    
    getById: async (playlistId: string): Promise<Playlist | null> => {
      await simulateDelay();
      return playlists.find(playlist => playlist.id === playlistId) || null;
    },
    
    create: async (playlistData: Partial<Playlist>): Promise<Playlist> => {
      await simulateDelay();
      // In a real API, this would create a new playlist
      return {
        id: `playlist-${Date.now()}`,
        title: playlistData.title || 'New Playlist',
        description: playlistData.description || '',
        thumbnailUrl: 'https://via.placeholder.com/640x360',
        videoCount: 0,
        createdAt: new Date().toISOString(),
        videos: [],
        creator: {
          id: 'user-123',
          username: 'johnsmith',
        },
      };
    },
    
    update: async (playlistId: string, playlistData: Partial<Playlist>): Promise<Playlist> => {
      await simulateDelay();
      const playlist = playlists.find(p => p.id === playlistId);
      if (!playlist) throw new Error('Playlist not found');
      
      return { ...playlist, ...playlistData };
    },
    
    delete: async (playlistId: string): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would delete a playlist
      return true;
    },
    
    addVideo: async (playlistId: string, videoId: string): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would add a video to a playlist
      return true;
    },
    
    removeVideo: async (playlistId: string, videoId: string): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would remove a video from a playlist
      return true;
    },
  },
  
  // Watch history endpoints
  history: {
    getAll: async (): Promise<Video[]> => {
      await simulateDelay();
      return [...watchHistory];
    },
    
    addToHistory: async (videoId: string): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would add a video to watch history
      return true;
    },
    
    clearHistory: async (): Promise<boolean> => {
      await simulateDelay();
      // In a real API, this would clear watch history
      return true;
    },
  },
};