import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'College Application Portal' }) => {
  const location = useLocation();
  const isLoggedIn = location.pathname !== '/';

  return (
    <header className="bg-white dark:bg-darkbg-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isLoggedIn ? '/dashboard' : '/'} className="flex-shrink-0 flex items-center">
              <Logo size="md" className="flex-shrink-0" />
              <span className="ml-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {title}
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {isLoggedIn && (
              <nav className="hidden md:flex space-x-4 mr-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-darktext-100 hover:bg-gray-100 dark:hover:bg-darkbg-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/application-form"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/application-form'
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-darktext-100 hover:bg-gray-100 dark:hover:bg-darkbg-700'
                  }`}
                >
                  Application
                </Link>
                <Link
                  to="/video-tutorials"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/video-tutorials'
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-darktext-100 hover:bg-gray-100 dark:hover:bg-darkbg-700'
                  }`}
                >
                  Tutorials
                </Link>
              </nav>
            )}

            <div className="flex items-center">
              <ThemeToggle />
              
              {isLoggedIn && (
                <div className="ml-4 relative flex-shrink-0">
                  <div className="rounded-full p-1 text-gray-700 dark:text-darktext-100 hover:bg-gray-100 dark:hover:bg-darkbg-700 transition-colors">
                    <span className="sr-only">User menu</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
