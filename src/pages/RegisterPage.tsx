import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'cover'
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (type === 'avatar') {
        setAvatar(file);
      } else {
        setCoverImage(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!avatar) {
      setError('Please upload a profile picture.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Submitting registration...');
      console.log('Avatar:', avatar);
      console.log('Cover image:', coverImage);

      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar,
        coverImage: coverImage ?? undefined,
      });

      navigate('/');
    } catch (err: any) {
      console.error('Register failed:', err);
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-gray-600">Join our community of creators and viewers</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {[ 
              { id: 'fullName', type: 'text', label: 'Full Name' },
              { id: 'username', type: 'text', label: 'Username' },
              { id: 'email', type: 'email', label: 'Email address' },
              { id: 'password', type: 'password', label: 'Password' },
              { id: 'confirmPassword', type: 'password', label: 'Confirm Password' },
            ].map(({ id, type, label }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  className="input"
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium mb-1">
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="input"
                required
                onChange={(e) => handleFileChange(e, 'avatar')}
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
                Cover Image (optional)
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) => handleFileChange(e, 'cover')}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
