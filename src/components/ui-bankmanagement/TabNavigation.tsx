import { Link, useLocation } from "wouter";

export default function TabNavigation() {
  const [location] = useLocation();

  const tabs = [
    { path: "/bank-management", label: "Bank Management" },
    { path: "/error-bank-log", label: "Error Bank Log" }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <Link key={tab.path} href={tab.path}>
              <a className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                location === tab.path 
                  ? "border-orange-500 text-orange-600 bg-orange-50" 
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}>
                {tab.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}