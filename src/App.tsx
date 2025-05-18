import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loading from './components/common/Loading';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const EditVideoPage = lazy(() => import('./pages/EditVideoPage'));
const ChannelPage = lazy(() => import('./pages/ChannelPage'));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'));
const PlaylistsPage = lazy(() => import('./pages/PlaylistsPage'));
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'));
const NewPlaylistPage = lazy(() => import('./pages/playlists/NewPlaylistPage'));
const EditPlaylistPage = lazy(() => import('./pages/playlists/EditPlaylistPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const StatsPage = lazy(() => import('./pages/dashboard/StatsPage'));
const VideosPage = lazy(() => import('./pages/dashboard/VideosPage'));
const WatchHistoryPage = lazy(() => import('./pages/WatchHistoryPage'));
const LikedVideosPage = lazy(() => import('./pages/LikedVideosPage'));
const TweetsPage = lazy(() => import('./pages/tweets/TweetsPage'));
const NewTweetPage = lazy(() => import('./pages/tweets/NewTweetPage'));
const EditTweetPage = lazy(() => import('./pages/tweets/EditTweetPage'));
const HealthPage = lazy(() => import('./pages/HealthPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="watch/:videoId" element={<WatchPage />} />
          <Route path="c/:username" element={<ChannelPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="health" element={<HealthPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="upload" element={<UploadPage />} />
            <Route path="edit/{:videoId}" element={<EditVideoPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="playlists" element={<PlaylistsPage />} />
            <Route path="playlists/new" element={<NewPlaylistPage />} />
            <Route path="playlists/:playlistId" element={<PlaylistPage />} />
            <Route path="playlists/edit/:playlistId" element={<EditPlaylistPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/stats" element={<StatsPage />} />
            <Route path="dashboard/videos" element={<VideosPage />} />
            <Route path="history" element={<WatchHistoryPage />} />
            <Route path="liked-videos" element={<LikedVideosPage />} />
            <Route path="tweets" element={<TweetsPage />} />
            <Route path="tweets/new" element={<NewTweetPage />} />
            <Route path="tweets/edit/:tweetId" element={<EditTweetPage />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;