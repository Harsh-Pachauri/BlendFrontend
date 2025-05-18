// Mock data for the application

// Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  publishedAt: string; // ISO date string
  isPublished: boolean;
  creator: {
    id: string;
    username: string;
    avatar: string;
  };
}

export interface Channel {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverImage: string;
  description: string;
  subscriberCount: number;
  isSubscribed: boolean;
  videos: Video[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
  createdAt: string;
  videos: Video[];
  creator: {
    id: string;
    username: string;
  };
}

// Mock videos data
export const videos: Video[] = [
  {
    id: 'video-1',
    title: 'How to Build a React App with TypeScript',
    description: 'In this tutorial, we\'ll learn how to create a React application using TypeScript and modern best practices.',
    thumbnailUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/react-typescript.mp4',
    duration: 843, // 14:03
    views: 128654,
    likes: 8432,
    publishedAt: '2023-07-15T14:30:00Z',
    isPublished: true,
    creator: {
      id: 'user-1',
      username: 'techguru',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: 'video-2',
    title: 'Creating Beautiful UI Animations with CSS',
    description: 'Learn how to create smooth, eye-catching animations using pure CSS techniques.',
    thumbnailUrl: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/css-animations.mp4',
    duration: 685, // 11:25
    views: 98732,
    likes: 6298,
    publishedAt: '2023-08-22T10:15:00Z',
    isPublished: true,
    creator: {
      id: 'user-2',
      username: 'cssmaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: 'video-3',
    title: 'Building a Responsive Dashboard with Tailwind CSS',
    description: 'A step-by-step guide to creating a fully responsive admin dashboard using Tailwind CSS.',
    thumbnailUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/tailwind-dashboard.mp4',
    duration: 1254, // 20:54
    views: 75431,
    likes: 5124,
    publishedAt: '2023-09-05T08:45:00Z',
    isPublished: true,
    creator: {
      id: 'user-1',
      username: 'techguru',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: 'video-4',
    title: 'JavaScript Array Methods You Need to Know',
    description: 'Master essential JavaScript array methods that will make your code cleaner and more efficient.',
    thumbnailUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/js-array-methods.mp4',
    duration: 723, // 12:03
    views: 112534,
    likes: 7865,
    publishedAt: '2023-10-12T16:20:00Z',
    isPublished: true,
    creator: {
      id: 'user-3',
      username: 'jsdev',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: 'video-5',
    title: 'Introduction to Next.js 13: App Router and Server Components',
    description: 'Dive into the latest features of Next.js 13, including the new App Router and Server Components.',
    thumbnailUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/nextjs-13.mp4',
    duration: 1582, // 26:22
    views: 87621,
    likes: 6234,
    publishedAt: '2023-11-03T12:00:00Z',
    isPublished: true,
    creator: {
      id: 'user-2',
      username: 'cssmaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: 'video-6',
    title: 'Getting Started with GraphQL and Apollo Client',
    description: 'Learn how to implement GraphQL in your React applications using Apollo Client.',
    thumbnailUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://example.com/videos/graphql-apollo.mp4',
    duration: 1865, // 31:05
    views: 65432,
    likes: 4321,
    publishedAt: '2023-12-18T09:30:00Z',
    isPublished: true,
    creator: {
      id: 'user-3',
      username: 'jsdev',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
];

// Mock channels data
export const channels: Channel[] = [
  {
    id: 'user-1',
    username: 'techguru',
    name: 'Tech Guru',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'I create tutorials on web development, focusing on React, TypeScript, and modern JavaScript frameworks.',
    subscriberCount: 128500,
    isSubscribed: true,
    videos: videos.filter(video => video.creator.id === 'user-1'),
  },
  {
    id: 'user-2',
    username: 'cssmaster',
    name: 'CSS Master',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Front-end developer sharing tips and tricks on creating beautiful user interfaces with CSS.',
    subscriberCount: 85200,
    isSubscribed: false,
    videos: videos.filter(video => video.creator.id === 'user-2'),
  },
  {
    id: 'user-3',
    username: 'jsdev',
    name: 'JavaScript Developer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Sharing advanced JavaScript techniques and best practices for modern web development.',
    subscriberCount: 97800,
    isSubscribed: true,
    videos: videos.filter(video => video.creator.id === 'user-3'),
  },
];

// Mock playlists data
export const playlists: Playlist[] = [
  {
    id: 'playlist-1',
    title: 'React Essentials',
    description: 'A collection of tutorials covering React fundamentals and advanced concepts.',
    thumbnailUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoCount: 3,
    createdAt: '2023-06-15T10:00:00Z',
    videos: videos.slice(0, 3),
    creator: {
      id: 'user-1',
      username: 'techguru',
    },
  },
  {
    id: 'playlist-2',
    title: 'CSS Masterclass',
    description: 'Learn advanced CSS techniques for creating beautiful user interfaces.',
    thumbnailUrl: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoCount: 2,
    createdAt: '2023-07-22T14:30:00Z',
    videos: videos.slice(1, 3),
    creator: {
      id: 'user-2',
      username: 'cssmaster',
    },
  },
  {
    id: 'playlist-3',
    title: 'JavaScript Deep Dive',
    description: 'Advanced JavaScript concepts and patterns for experienced developers.',
    thumbnailUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoCount: 2,
    createdAt: '2023-08-05T09:15:00Z',
    videos: videos.slice(3, 5),
    creator: {
      id: 'user-3',
      username: 'jsdev',
    },
  },
];

// Mock watch history
export const watchHistory: Video[] = videos.slice(0, 4);