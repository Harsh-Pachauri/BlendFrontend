import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        scrolled={scrolled} 
      />
      
      <div className="flex flex-1 pt-16">
        <Sidebar 
          isOpen={isSidebarOpen} 
          closeSidebar={closeSidebar} 
        />
        
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 max-w-[1920px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;