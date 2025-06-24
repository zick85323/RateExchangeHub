import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, ArrowLeftRight } from "lucide-react";
import { Link } from "wouter";

export default function CoinExchange() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center">
          <Link href="/rate-settings">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Back to Rate Settings</span>
            </Button>
          </Link>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Rate</span>
            </Button>
            <Button
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Coin Exchange</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Exchange Active</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Live Trading</Badge>
            </div>
          </div>
        </div>

        {/* Placeholder Content - You can add your coin exchange components here */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Coin Exchange Interface</h2>
          <p className="text-gray-600">This is where your coin exchange components will go.</p>
        </div>
      </div>
    </div>
  );
}