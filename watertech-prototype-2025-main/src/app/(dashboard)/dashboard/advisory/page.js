'use client';

import { useState, useEffect, useRef } from 'react';
import { RiSendPlane2Fill, RiRefreshLine, RiArrowDownSLine, RiVipCrownFill } from 'react-icons/ri';

// Mock conversation data with water quality advisor
const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    message: "👋 Hello! I'm your Water Quality Advisor. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

// Mock suggestions for quick questions
const suggestions = [
  "What's the best irrigation schedule for my cotton fields?",
  "How can I improve water quality for my crops?",
  "What does the high EC level mean for my farm?",
  "Should I adjust fertilizer based on water quality?",
  "How to interpret my latest water analysis report?",
  "What crops are best suited for my current water conditions?",
  "Do I need water treatment for my irrigation system?",
  "How can I reduce water usage while maintaining crop yields?",
];

export default function AdvisoryPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef(null);

  // Load messages and simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      // Using plain JS to avoid TypeScript errors
      setTimeout(() => {
        // @ts-ignore
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 100);
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      let response;
      
      // Simple keyword-based responses
      if (inputMessage.toLowerCase().includes('cotton')) {
        response = "Based on your current water quality parameters (EC: 1.1 dS/m, pH: 7.0), cotton is actually a good match. It's moderately salt-tolerant. I recommend maintaining irrigation at 70-80% field capacity during the growing season, with leaching irrigation every 3-4 weeks to prevent salt buildup.";
      } 
      else if (inputMessage.toLowerCase().includes('ec') || inputMessage.toLowerCase().includes('electrical conductivity')) {
        response = "Your EC level of 1.1 dS/m indicates moderate salinity. This is suitable for salt-tolerant crops like cotton and barley, but may reduce yields for sensitive crops like strawberries or beans. Consider blending with lower-EC water sources or implementing additional leaching irrigation to manage salinity.";
      }
      else if (inputMessage.toLowerCase().includes('fertilizer') || inputMessage.toLowerCase().includes('nutrient')) {
        response = "Given your water's nitrate levels (5.5 mg/l), you should reduce nitrogen fertilizer application by approximately 12-15%. Your water already provides some nitrogen to the crops. For phosphorus and potassium, maintain your regular schedule. I recommend soil testing to fine-tune your fertilization strategy.";
      }
      else if (inputMessage.toLowerCase().includes('improve') || inputMessage.toLowerCase().includes('better')) {
        response = "To improve your water quality, consider implementing sediment filters to reduce suspended solids, installing a reverse osmosis system for reducing salt content, and using a proper water aeration system to increase dissolved oxygen. Regular monitoring and maintenance of your irrigation system will also help maintain water quality.";
      }
      else {
        response = "Thank you for your question. Based on your farm's current water quality data, I would recommend monitoring your EC levels closely as they are approaching the upper threshold for some of your crops. Consider implementing a 15% leaching fraction in your irrigation schedule to prevent salt buildup in the root zone. Would you like me to provide more specific recommendations for any particular crop?";
      }
      
      const botMessage = {
        id: Date.now(),
        sender: 'bot',
        message: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-6">
      {/* Main chat interface */}
      <div className="flex flex-1 flex-col rounded-lg border bg-white shadow-sm">
        {/* Chat header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-brand-primary text-white">
                <div className="flex h-full w-full items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Water Quality Advisor</h3>
                <p className="text-sm text-gray-500">Ask me anything about your water quality and irrigation</p>
              </div>
            </div>
            <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
              <RiRefreshLine className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat messages */}
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
          </div>
        ) : (
          <div 
            ref={chatContainerRef}
            className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <span className="mt-1 block text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] space-x-2 rounded-2xl bg-gray-100 px-4 py-3 text-gray-800">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Premium Upgrade Banner */}
        <div className="border-t border-b bg-gradient-to-r from-amber-50 to-yellow-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                <RiVipCrownFill className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Upgrade to Premium</h4>
                <p className="text-xs text-gray-600">Get advanced crop recommendations and 24/7 expert access</p>
              </div>
            </div>
            <button className="rounded-full bg-brand-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-primary-dark">
              Upgrade
            </button>
          </div>
        </div>

        {/* Chat input */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              disabled={loading || isTyping}
            />
            <button
              type="submit"
              disabled={loading || isTyping || !inputMessage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white disabled:opacity-50"
            >
              <RiSendPlane2Fill className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Suggested Questions</h3>
          <button className="flex items-center text-sm text-brand-primary hover:text-brand-secondary">
            More suggestions <RiArrowDownSLine className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-md border border-gray-200 bg-gray-50 p-3 text-left text-sm hover:border-brand-primary hover:bg-brand-light"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
