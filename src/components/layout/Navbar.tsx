import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Bell, Upload, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';

interface NavbarProps {
  toggleSidebar: () => void;
  scrolled: boolean;
}

const Navbar = ({ toggleSidebar, scrolled }: NavbarProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  console.log(user)
  console.log('Nihao')
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 transition-all duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center max-w-xl flex-1 mx-4 lg:mx-8"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search videos..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </form>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link 
                to="/upload"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex"
                aria-label="Upload video"
              >
                <Upload className="w-6 h-6" />
              </Link>
              
              <button 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
              </button>
              
              <div className="relative ml-2">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 z-50 animate-scale-in">
                    <Link 
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link 
                      to={`/c/${user?.username}`}
                      className="flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Your Channel
                    </Link>
                    <Link 
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <hr className="my-1 border-slate-200 dark:border-slate-700" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-error-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link 
              to="/login"
              className="btn btn-primary flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile search */}
      <form 
        onSubmit={handleSearch}
        className="md:hidden px-4 pb-3"
      >
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search videos..."
            className="input pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Navbar;