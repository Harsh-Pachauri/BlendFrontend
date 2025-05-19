import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState('');
  const [email] = useState(user?.email || '');

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/v1/users/update-account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, bio }),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updatedUser = await res.json();
      updateUserProfile(updatedUser?.data?.user);
      alert('Profile updated!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return alert('Please select an avatar image');

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const res = await fetch('/api/v1/users/update-avatar', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) throw new Error('Avatar upload failed');
      const data = await res.json();
      updateUserProfile(data?.data?.user);
      alert('Avatar updated!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleCoverUpload = async () => {
    if (!coverFile) return alert('Please select a cover image');

    const formData = new FormData();
    formData.append('coverImage', coverFile);

    try {
      const res = await fetch('/api/v1/users/update-cover-image', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) throw new Error('Cover image upload failed');
      const data = await res.json();
      updateUserProfile(data?.data?.user);
      alert('Cover image updated!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch('/api/v1/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      if (!res.ok) throw new Error('Failed to update password');
      alert('Password updated!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <nav className="w-full md:w-48 space-y-1">
          {['profile', 'account', 'notifications', 'privacy'].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Avatar</label>
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  />
                  <button onClick={handleAvatarUpload} className="btn btn-secondary">
                    Upload
                  </button>
                </div>
              </div>

              {/* Cover Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                />
                <button onClick={handleCoverUpload} className="btn btn-secondary mt-2">
                  Upload
                </button>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="input min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button onClick={handleSaveProfile} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Email Display */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="input" value={email} disabled />
              </div>

              {/* Change Password */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    className="input"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button onClick={handleChangePassword} className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications & Privacy placeholders */}
          {activeTab === 'notifications' && <p>Notifications settings coming soon.</p>}
          {activeTab === 'privacy' && <p>Privacy settings coming soon.</p>}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
