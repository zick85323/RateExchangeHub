'use client';

import { useState, useEffect } from "react";

export default function TabNavigation() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);
    
    // Listen for navigation changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to popstate for back/forward navigation
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleTabClick = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    // Trigger a custom event to notify other components of navigation
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const tabs = [
    { path: "/bank-management", label: "Bank Management" },
    { path: "/error-bank-log", label: "Error Bank Log" }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                currentPath === tab.path 
                  ? "border-orange-500 text-orange-600 bg-orange-50" 
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}