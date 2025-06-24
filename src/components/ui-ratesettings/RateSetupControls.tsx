import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { currencies, platforms } from "@/examples/ratesettingsData";

export default function RateSetupControls() {
  const [buyingCurrency, setBuyingCurrency] = useState("NGN");
  const [sellingRateSource, setSellingRateSource] = useState("binance");
  const [buyFrom, setBuyFrom] = useState("binance");
  const [markupType, setMarkupType] = useState<"percentage" | "flat">("percentage");
  const [markupValue, setMarkupValue] = useState(2.5);

  // Mock base rate
  const baseRate = 64300000;
  const markup = markupType === "percentage" 
    ? baseRate * (markupValue / 100)
    : 1607500;
  const calculatedRate = baseRate + markup;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-5 w-5 text-orange-500" />
        <span className="text-lg font-semibold text-gray-900">Rate Setup Controls</span>
      </div>
      
      <div className="space-y-6">
        {/* Rate Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Buying Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Buying Currency</label>
            <Select value={buyingCurrency} onValueChange={setBuyingCurrency}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selling Rate Source */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Selling Rate Source</label>
            <Select value={sellingRateSource} onValueChange={setSellingRateSource}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="coinbase">Coinbase</SelectItem>
                <SelectItem value="kraken">Kraken</SelectItem>
                <SelectItem value="bitstamp">Bitstamp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buy From */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Buy From</label>
            <Select value={buyFrom} onValueChange={setBuyFrom}>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="coinbase">Coinbase</SelectItem>
                <SelectItem value="kraken">Kraken</SelectItem>
                <SelectItem value="paxful">Paxful</SelectItem>
                <SelectItem value="noones">Noones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Markup */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Markup (%)</label>
            <div className="flex">
              <Button
                type="button"
                variant={markupType === "percentage" ? "default" : "outline"}
                className={`rounded-r-none text-sm px-3 py-2 h-auto ${markupType === "percentage" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border-gray-300 text-gray-700"}`}
                onClick={() => setMarkupType("percentage")}
              >
                Percentage (%)
              </Button>
              <Button
                type="button"
                variant={markupType === "flat" ? "default" : "outline"}
                className={`rounded-l-none text-sm px-3 py-2 h-auto ${markupType === "flat" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border-gray-300 text-gray-700"}`}
                onClick={() => {
                  setMarkupType("flat");
                  setMarkupValue(1607500);
                }}
              >
                Flat Amount (₦)
              </Button>
            </div>
          </div>
        </div>

        {/* Rate Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base Rate (binance):</span>
            <span className="text-xl font-bold text-gray-900">₦64,300,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Markup (2.5%):</span>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">₦1,607,500</span>
              <span className="text-xs text-gray-500">(2.5%)</span>
              <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                Competitive
              </Badge>
            </div>
          </div>
        </div>

        {/* Calculated Rate */}
        <div className="border-t pt-6">
          <div className="text-left">
            <div className="text-lg font-semibold text-gray-900 mb-2">Calculated Rate:</div>
            <div className="text-4xl font-bold text-orange-500">₦65,907,500</div>
            <div className="text-sm text-gray-500 mt-1">per BTC</div>
          </div>
        </div>

        {/* Configuration Settings */}
        <div className="bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">CURRENCY</div>
              <div className="text-lg font-bold text-gray-900">NGN</div>
              <div className="text-sm text-gray-600">Nigeria Naira</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">PLATFORM</div>
              <div className="text-lg font-bold text-gray-900">Binance</div>
              <div className="text-sm text-gray-600">Rate Source</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">PLATFORM</div>
              <div className="text-lg font-bold text-gray-900">Binance/Paxful/Noones</div>
              <div className="text-sm text-gray-600">Buy From</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">MARKUP</div>
              <div className="text-lg font-bold text-gray-900">2.5%</div>
              <div className="text-sm text-gray-600">Percentage Mode</div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Profit per BTC:</span>
              <span className="text-sm font-semibold text-green-600">₦1,607,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Effective Markup:</span>
              <span className="text-sm font-semibold text-blue-600">2.50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}