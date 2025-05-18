import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <nav className="w-full md:w-48 space-y-1">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'account'
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'notifications'
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeTab === 'privacy'
                ? 'bg-primary-50 text-primary-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </button>
        </nav>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Avatar</label>
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                  <button className="btn btn-secondary">Change Avatar</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <div className="aspect-[3/1] bg-gray-100 rounded-lg mb-2" />
                <button className="btn btn-secondary">Change Cover Image</button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="input"
                  defaultValue={user?.username}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="input min-h-[100px]"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="flex justify-end">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="input"
                  defaultValue={user?.email}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input type="password" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input type="password" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input type="password" className="input" />
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-error-600 mb-4">
                  Danger Zone
                </h3>
                <button className="btn bg-error-50 text-error-600 hover:bg-error-100">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>New video from subscribed channels</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Comments on your videos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Replies to your comments</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Channel mentions</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Make my subscriptions private</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Keep my playlists private by default</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Hide my watch history</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;