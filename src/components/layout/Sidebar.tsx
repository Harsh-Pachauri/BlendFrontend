import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Video,
  Clock,
  Heart,
  MessageSquare,
  Settings,
  BarChart2,
} from 'lucide-react';
import type { FC } from 'react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/dashboard/videos', label: 'My Videos', icon: Video },
    { to: '/history', label: 'History', icon: Clock },
    { to: '/liked-videos', label: 'Liked Videos', icon: Heart },
    { to: '/tweets', label: 'Tweets', icon: MessageSquare },
    { to: '/dashboard/stats', label: 'Analytics', icon: BarChart2 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${
                location.pathname === to
                  ? 'bg-slate-200 dark:bg-slate-700'
                  : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
