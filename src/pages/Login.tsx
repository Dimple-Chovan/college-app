import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="College Application Portal" />
      
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12 bg-gray-50 dark:bg-darkbg-900">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-darktext-100">
            Welcome to College Application Portal
          </h1>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-colors">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-darktext-100">
                Sign In
              </h2>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-darktext-100 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-darktext-100 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-darktext-200">
                  Demo credentials: admin / password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;