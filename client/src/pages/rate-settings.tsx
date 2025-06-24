import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import RateSetupControls from "@/components/RateSetupControls";
import MyOffersSetup from "@/components/MyOffersSetup";
import type { RateConfiguration } from "@shared/schema";

export default function RateSettings() {
  const [currentConfig, setCurrentConfig] = useState<RateConfiguration | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Crypto Exchange Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Rate Configuration Active</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Ready for Trading</Badge>
            </div>
          </div>
        </div>

        {/* Rate Setup Controls */}
        <RateSetupControls onConfigurationChange={setCurrentConfig} />

        {/* My Offers Setup */}
        <MyOffersSetup />

        {/* Status Bar */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">Rate Configuration Active</span>
              <span className="text-green-600 text-sm">
                Your current rate is ready for trading
              </span>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
