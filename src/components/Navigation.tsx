'use client';

import { useState, useEffect } from "react";

export default function Navigation() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navItems = [
    { path: "/coin-exchange", label: "Coin Exchange" },
    { path: "/rate-settings", label: "Rate Settings" }, 
    { path: "/bank-management", label: "Bank Management" },
    { path: "/error-bank-log", label: "Error Bank Log" }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPath === item.path 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}