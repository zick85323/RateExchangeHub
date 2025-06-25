import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/coin-exchange", label: "Coin Exchange" },
    { path: "/rate-settings", label: "Rate Settings" }, 
    { path: "/bank-management", label: "Bank Management" }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                location === item.path 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}