import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  isCreator: boolean;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File;
  coverImage?: File;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure axios sends cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('https://blend-backend.vercel.app//api/v1/users/current-user');
        if (res.data?.data) {
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Debugging: Logs current user state
  useEffect(() => {
    console.log('🧑 Current user:', user);
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post('https://blend-backend.vercel.app//api/v1/users/login', {
        email,
        password,
      });
      setUser(res.data.data.user);
    } catch (error) {
      console.error('Login error', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      if (userData.avatar) formData.append('avatar', userData.avatar);
      if (userData.coverImage) formData.append('coverImage', userData.coverImage);

      const res = await axios.post('https://blend-backend.vercel.app//api/v1/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(res.data.data);
    } catch (error) {
      console.error('Registration error', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.post('https://blend-backend.vercel.app//api/v1/users/logout');
      setUser(null); // This will trigger the `useEffect` above to show updated value
          // Clear localStorage
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const res = await axios.patch('https://blend-backend.vercel.app//api/v1/users/update', data);
      setUser(res.data.data);
    } catch (error) {
      console.error('Profile update error', error);
      throw new Error('Profile update failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
