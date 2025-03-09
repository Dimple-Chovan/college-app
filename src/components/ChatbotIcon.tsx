import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/solid';

interface ChatbotIconProps {
  onClick?: () => void;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Pulsing animation ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-300 animate-ping opacity-75"></div>
        
        {/* Tooltip that appears on hover */}
        {isHovered && (
          <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap transition-opacity duration-300">
            Need help? Chat with AI assistant
          </div>
        )}
        
        {/* Main button */}
        <button
          onClick={onClick}
          className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-110 focus:outline-none"
          aria-label="Open AI Assistant"
        >
          <BellIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotIcon;
