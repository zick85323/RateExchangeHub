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
    : markupValue;
  const calculatedRate = baseRate + markup;

  // Format currency
  const formatCurrency = (amount: number) => {
    const currency = currencies.find(c => c.code === buyingCurrency);
    return `${currency?.symbol || "₦"}${amount.toLocaleString()}`;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-orange-500" />
          <span className="text-gray-900 dark:text-gray-100">Rate Setup Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rate Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Buying Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Buying Currency</label>
            <Select value={buyingCurrency} onValueChange={setBuyingCurrency}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selling Rate Source */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Selling Rate Source</label>
            <Select value={sellingRateSource} onValueChange={setSellingRateSource}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.filter(p => p.type === 'exchange').map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buy From */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Buy From</label>
            <Select value={buyFrom} onValueChange={setBuyFrom}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Markup */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Markup (%)</label>
            <div className="flex">
              <Button
                type="button"
                variant={markupType === "percentage" ? "default" : "outline"}
                className={`rounded-r-none ${markupType === "percentage" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                onClick={() => setMarkupType("percentage")}
              >
                Percentage (%)
              </Button>
              <Button
                type="button"
                variant={markupType === "flat" ? "default" : "outline"}
                className={`rounded-l-none ${markupType === "flat" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
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

        {/* Rate Calculations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Base Rate ({sellingRateSource}):</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(baseRate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Markup ({markupType === "percentage" ? `${markupValue}%` : "flat"}):</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-green-600">{formatCurrency(markup)}</span>
                {markupType === "percentage" && (
                  <>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({markupValue}%)</span>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Competitive
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calculated Rate:</div>
            <div className="text-3xl font-bold text-orange-600">{formatCurrency(calculatedRate)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">per BTC</div>
          </div>
        </div>

        {/* Configuration Settings */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Configuration Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CURRENCY</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{buyingCurrency}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currencies.find(c => c.code === buyingCurrency)?.name}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PLATFORM</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {platforms.find(p => p.id === sellingRateSource)?.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Rate Source</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PLATFORM</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {platforms.find(p => p.id === buyFrom)?.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Buy From</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MARKUP</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {markupType === "percentage" ? `${markupValue}%` : formatCurrency(markupValue)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {markupType === "percentage" ? "Percentage Mode" : "Flat Amount Mode"}
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Profit per BTC:</span>
              <span className="text-sm font-semibold text-green-600">₦1,607,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Effective Markup:</span>
              <span className="text-sm font-semibold text-blue-600">2.50%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}