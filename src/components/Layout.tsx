import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/solid';

import ChatbotIcon from './ChatbotIcon';
import ChatbotModal from './ChatbotModal';
import { useTheme } from '../context/ThemeContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Application Form', href: '/application-form' },
  { name: 'Video Tutorials', href: '/video-tutorials' },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Logout', href: '/' },
];

const DashboardLayout = ({ children }: any) => {
  const location = useLocation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case '/application-form': return 'Application Form';
      case '/video-tutorials': return 'Video Tutorials';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkbg-900 text-gray-900 dark:text-darktext-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 dark:bg-darkbg-800 fixed top-0 w-full z-50 shadow-md transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block ml-10 space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    item.href === location.pathname 
                      ? 'bg-indigo-700 dark:bg-indigo-900 text-white' 
                      : 'text-white hover:bg-indigo-500 dark:hover:bg-indigo-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-indigo-500 dark:hover:bg-indigo-800 focus:outline-none transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>

            {/* Notifications */}
            <button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
              <BellIcon className="size-6" />
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <UserCircleIcon className="w-10 h-10 text-gray-400 cursor-pointer" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkbg-800 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-colors">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white dark:bg-darkbg-800 shadow-sm sticky top-16 z-40 transition-colors">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-darktext-100">
            {getTitle()}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Chatbot */}
      <ChatbotIcon onClick={() => setIsChatbotOpen(true)} />
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default DashboardLayout;
