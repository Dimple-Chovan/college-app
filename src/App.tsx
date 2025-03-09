import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import VideoTutorial from './pages/VideoTutorial';
import OpenAITest from './components/OpenAITest';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen transition-colors duration-200 bg-white dark:bg-darkbg-900 text-gray-900 dark:text-darktext-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/video-tutorials" element={<VideoTutorial />} />
            <Route path="/openai-test" element={<OpenAITest />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;