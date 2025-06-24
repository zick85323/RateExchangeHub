import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import RateSetupControls from "@/components/ui-ratesettings/RateSetupControls";
import MyOffersSetupPanel from "@/components/ui-ratesettings/MyOffersSetupPanel";

export default function RateSettingsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleRefreshRate = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Action Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleRefreshRate}
            disabled={isRefreshing}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Rate</span>
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
        {/* Rate Setup Controls */}
        <RateSetupControls />
        
        {/* My Offers Setup Panel */}
        <MyOffersSetupPanel />

        {/* Status Bar */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">Rate Configuration Active</span>
              <span className="text-green-600 text-sm">
                Your current rate of ₦65,907,500 is ready for trading
              </span>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}