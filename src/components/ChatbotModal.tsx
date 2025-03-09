import React, { useState, useContext } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { FormContext } from '../context/FormContext';
import { getAIResponse } from '../services/openaiService';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const { formProgress } = useContext(FormContext);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; html?: boolean }[]>([
    { text: 'Hello! How can I help you with your college application today?', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    
    // Add loading message
    setMessages(prev => [...prev, { text: 'Thinking...', isUser: false }]);
    
    // Show options after Hi
    if (text.toLowerCase() === 'hi') {
      setTimeout(() => {
        // Remove the loading message
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages.pop(); // Remove the last message (loading)
          return newMessages;
        });
        
        setMessages(prev => [...prev, { 
          text: 'I\'m here to help with your college application process. What would you like assistance with?', 
          isUser: false 
        }]);
        setShowOptions(true);
      }, 1000);
    } else if (showCustomInput) {
      console.log('Sending custom query to OpenAI:', text);
      // Use OpenAI for custom queries
      getAIResponse(text)
        .then(aiResponse => {
          console.log('Received AI response:', aiResponse);
          // Remove the loading message
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages.pop(); // Remove the last message (loading)
            return newMessages;
          });
          
          // Add AI response
          setMessages(prev => [...prev, { 
            text: aiResponse, 
            isUser: false 
          }]);
          
          // Show follow-up buttons
          setShowFollowUp(true);
        })
        .catch(error => {
          console.error('Error getting AI response in ChatbotModal:', error);
          
          // Remove the loading message
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages.pop(); // Remove the last message (loading)
            return newMessages;
          });
          
          // Add error message
          setMessages(prev => [...prev, { 
            text: 'Sorry, I encountered an error processing your request. Please try again later.', 
            isUser: false 
          }]);
          
          // Show follow-up buttons
          setShowFollowUp(true);
        });
    } else {
      // For other messages
      setTimeout(() => {
        // Remove the loading message
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages.pop(); // Remove the last message (loading)
          return newMessages;
        });
        
        setMessages(prev => [...prev, { 
          text: 'Thank you for your message. Our team will get back to you shortly. Is there anything else I can help you with?', 
          isUser: false 
        }]);
        setShowOptions(true); // Show options again after any message
      }, 1000);
    }
  };
  
  const resetChat = () => {
    setMessages([
      { text: 'Hello! How can I help you with your college application today?', isUser: false },
    ]);
    setInputValue('');
    setShowOptions(false);
    setShowCustomInput(false);
    setShowFollowUp(false);
    setShowFeedback(false);
    setFeedbackRating(0);
  };

  const handleCloseModal = () => {
    // resetChat();
    onClose();
  };

  const handleFollowUpClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: option, isUser: true }]);
    
    if (option === 'Thanks, solves my problem') {
      // Hide follow-up buttons
      setShowFollowUp(false);
      setShowOptions(false);
      
      // Show feedback stars
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: 'You\'re welcome! I\'m glad I could help. How would you rate your experience?', 
          isUser: false 
        }]);
        setShowFeedback(true);
      }, 1000);
    } else if (option === 'Go back to all options') {
      // Hide follow-up buttons and show all options
      setShowFollowUp(false);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: 'Sure! Here are all the options again. What would you like help with?', 
          isUser: false 
        }]);
        setShowOptions(true);
      }, 1000);
    }
  };
  
  const handleFeedbackSubmit = (rating: number) => {
    setFeedbackRating(rating);
    setMessages(prev => [...prev, 
      { text: `Rating: ${rating} stars`, isUser: true },
      { text: 'Thank you for your feedback! Is there anything else you\'d like to know about the college application process?', isUser: false }
    ]);
    setShowFeedback(false);
    setShowOptions(true);
  };
  
  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: option, isUser: true }]);
    
    // Hide options
    setShowOptions(false);
    
    // Simulate AI response based on option selected
    setTimeout(() => {
      let responseText = '';
      let htmlResponse = false;
      
      switch(option) {
        case 'Personal Information':
          responseText = `
<h4 class="font-medium text-indigo-700 mb-2">Personal Information Section</h4>
<p class="mb-3">Status: <span class="${formProgress >= 25 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 25 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></p>

<p class="mb-2">This section requires:</p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>Full legal name</li>
  <li>Contact information (email, phone)</li>
  <li>Current address</li>
  <li>Date of birth</li>
  <li>Gender</li>
  <li>Nationality/citizenship</li>
</ul>

<p class="mb-2"><strong>Tips:</strong></p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>Use your legal name as it appears on official documents</li>
  <li>Provide an email you check regularly</li>
  <li>Double-check all information for accuracy</li>
</ul>

<p class="text-sm italic">Is this information helpful?</p>
`;
          htmlResponse = true;
          break;
        case 'Academic History':
          responseText = `
<h4 class="font-medium text-indigo-700 mb-2">Academic History Section</h4>
<p class="mb-3">Status: <span class="${formProgress >= 50 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 50 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></p>

<p class="mb-2">This section requires:</p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>Names of all schools/colleges attended</li>
  <li>Dates of attendance</li>
  <li>Degrees/diplomas earned</li>
  <li>GPA or percentage scores</li>
  <li>Transcripts (to be uploaded)</li>
</ul>

<p class="mb-2"><strong>Tips:</strong></p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>List institutions in chronological order (most recent first)</li>
  <li>Have your transcripts ready in PDF format</li>
  <li>Include any honors or academic achievements</li>
</ul>

<p class="text-sm italic">Is this information helpful?</p>
`;
          htmlResponse = true;
          break;
        case 'Documents Upload':
          responseText = `
<h4 class="font-medium text-indigo-700 mb-2">Documents Upload Section</h4>
<p class="mb-3">Status: <span class="${formProgress >= 75 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 75 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></p>

<p class="mb-2">Required documents:</p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>Photo ID (passport or government ID)</li>
  <li>Recent passport-sized photograph</li>
  <li>Academic transcripts</li>
  <li>Certificates and diplomas</li>
  <li>Statement of purpose (if applicable)</li>
  <li>Letters of recommendation (if applicable)</li>
</ul>

<p class="mb-2"><strong>File requirements:</strong></p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>File formats: PDF, JPG, or PNG</li>
  <li>Maximum file size: 5MB per document</li>
  <li>Clear, legible scans or photos</li>
</ul>

<p class="text-sm italic">Is this information helpful?</p>
`;
          htmlResponse = true;
          break;
        case 'Application Status':
          responseText = `
<h4 class="font-medium text-indigo-700 mb-2">Application Status</h4>
<div class="w-full bg-gray-200 rounded-full h-4 mb-3">
  <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full" style="width: ${formProgress}%"></div>
</div>
<p class="mb-3">Your application is <span class="font-medium">${formProgress}% complete</span></p>

<p class="mb-2">Completion status by section:</p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li>Personal Information: <span class="${formProgress >= 25 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 25 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></li>
  <li>Academic History: <span class="${formProgress >= 50 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 50 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></li>
  <li>Documents Upload: <span class="${formProgress >= 75 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 75 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></li>
  <li>Review & Submit: <span class="${formProgress >= 100 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}"> ${formProgress >= 100 ? 'Complete ✓' : 'Incomplete ⚠️'}</span></li>
</ul>

<p class="mb-2"><strong>Next steps:</strong></p>
<p class="mb-3">${formProgress < 100 ? 'Please complete all sections to submit your application.' : 'Your application is ready for submission! Click the Submit button on the Review page.'}</p>

<p class="text-sm italic">Is this information helpful?</p>
`;
          htmlResponse = true;
          break;
        case 'Help me with something else':
          responseText = 'Please type your question below, and I\'ll do my best to assist you.';
          setShowCustomInput(true);
          break;
        default:
          responseText = 'I\'m here to help with your college application process. What specific information do you need?';
      }
      
      setMessages(prev => [...prev, { text: responseText, isUser: false, html: htmlResponse }]);
      
      // Show follow-up buttons except for custom help
      if (option !== 'Help me with something else') {
        setShowFollowUp(true);
      } else {
        setShowFollowUp(false);
      }
    }, 1000);
  };

  const handleQuickReply = () => {
    handleSendMessage('Hi');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit input to 50 characters
    if (e.target.value.length <= 50) {
      setInputValue(e.target.value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex" aria-labelledby="chatbot-title" role="dialog" aria-modal="true">
      {/* Background overlay - only covers part of the screen */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" aria-hidden="true" onClick={onClose}></div>
      
      {/* Chat panel */}
      <div className="relative ml-auto w-full max-w-sm bg-white shadow-xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h3 className="text-lg font-medium text-white" id="chatbot-title">
            AI Assistant
          </h3>
          <div className="flex items-center">
            <button
              type="button"
              className="mr-3 text-white text-sm px-2 py-1 border border-white rounded hover:bg-white hover:text-indigo-600 transition-colors"
              onClick={resetChat}
              title="Clear chat history"
            >
              Clear Chat
            </button>
            <button
              type="button"
              className="rounded-md text-white hover:text-gray-200 focus:outline-none"
              onClick={handleCloseModal}
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${message.isUser 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-800'}`}
                >
                  {message.html ? (
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Options buttons */}
        {showOptions && (
          <div className="border-t border-gray-200 pt-3 px-4">
            <div className="text-sm text-gray-500 mb-2">Choose an option:</div>
            <div className="flex flex-wrap gap-2 mb-3">
              <button 
                onClick={() => handleOptionClick('Personal Information')}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:bg-indigo-100"
              >
                Personal Information
              </button>
              <button 
                onClick={() => handleOptionClick('Academic History')}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:bg-indigo-100"
              >
                Academic History
              </button>
              <button 
                onClick={() => handleOptionClick('Documents Upload')}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:bg-indigo-100"
              >
                Documents Upload
              </button>
              <button 
                onClick={() => handleOptionClick('Application Status')}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:bg-indigo-100"
              >
                Application Status
              </button>
              <button 
                onClick={() => handleOptionClick('Help me with something else')}
                className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-100"
              >
                Help me with something else
              </button>
            </div>
          </div>
        )}
        
        {/* Follow-up buttons */}
        {showFollowUp && (
          <div className="border-t border-gray-200 pt-3 px-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <button 
                onClick={() => handleFollowUpClick('Thanks, solves my problem')}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:bg-green-100"
              >
                Thanks, solves my problem
              </button>
              <button 
                onClick={() => handleFollowUpClick('Go back to all options')}
                className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-100"
              >
                Go back to all options
              </button>
            </div>
          </div>
        )}
        
        {/* Feedback stars */}
        {showFeedback && (
          <div className="border-t border-gray-200 pt-3 px-4">
            <div className="text-sm text-gray-500 mb-2">Please rate your experience:</div>
            <div className="flex justify-center space-x-2 mb-3">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFeedbackSubmit(rating)}
                  className={`text-2xl transition-colors ${feedbackRating >= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {messages.length === 1 ? (
            /* Show only Send Hi button initially */
            <div className="flex justify-center">
              <button 
                onClick={handleQuickReply}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                Send Hi
              </button>
            </div>
          ) : showCustomInput || messages.some(msg => msg.text === 'Help me with something else') ? (
            /* Show input box and send button for custom questions */
            <div className="flex flex-col space-y-2">
              {showCustomInput && (
                <button
                  onClick={() => {
                    setShowCustomInput(false);
                    setMessages(prev => [...prev, 
                      { text: 'Go back to all options', isUser: true },
                      { text: 'Here are all the options again. What would you like help with?', isUser: false }
                    ]);
                    setShowOptions(true);
                  }}
                  className="self-start mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-200 flex items-center"
                >
                  <span className="mr-1">←</span> Back to all options
                </button>
              )}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Type your message here (max 50 chars)..."
                  maxLength={50}
                  autoFocus
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-base font-medium text-white hover:from-indigo-600 hover:to-purple-700 focus:outline-none"
                >
                  Send
                </button>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {inputValue.length}/50 characters
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
