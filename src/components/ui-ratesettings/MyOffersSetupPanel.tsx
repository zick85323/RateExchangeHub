import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Handshake, Plus, CreditCard } from "lucide-react";
import { platforms, paymentMethods, coinTypes } from "@/examples/ratesettingsData";

export default function MyOffersSetupPanel() {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [platformSelector, setPlatformSelector] = useState("binance");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [coinType, setCoinType] = useState("BTC");

  const getPaymentMethodName = (id: string) => {
    return paymentMethods.find(p => p.id === id)?.name || id;
  };

  const getPlatformName = (id: string) => {
    return platforms.find(p => p.id === id)?.name || id;
  };

  const getCoinTypeName = (symbol: string) => {
    return coinTypes.find(c => c.symbol === symbol)?.name || symbol;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Handshake className="h-5 w-5 text-orange-500" />
          <span className="text-gray-900 dark:text-gray-100">My Offers Setup Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform Selector</label>
              <Select value={platformSelector} onValueChange={setPlatformSelector}>
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trade Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Trade Type</label>
              <div className="flex">
                <Button
                  type="button"
                  variant={tradeType === "buy" ? "default" : "outline"}
                  className={`flex-1 rounded-r-none ${tradeType === "buy" ? "bg-orange-500 hover:bg-orange-600 text-white" : "text-gray-700 dark:text-gray-300"}`}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={tradeType === "sell" ? "default" : "outline"}
                  className={`flex-1 rounded-l-none ${tradeType === "sell" ? "bg-orange-500 hover:bg-orange-600 text-white" : "text-gray-700 dark:text-gray-300"}`}
                  onClick={() => setTradeType("sell")}
                >
                  Sell
                </Button>
              </div>
            </div>

            {/* Coin Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Coin Type</label>
              <Select value={coinType} onValueChange={setCoinType}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coinTypes.map((coin) => (
                    <SelectItem key={coin.symbol} value={coin.symbol}>
                      {coin.symbol} - {coin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Create Offer Button */}
        <div className="mt-8">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create offer
          </Button>
        </div>

        {/* Current Configuration */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Configuration:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment:</div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {getPaymentMethodName(paymentMethod)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform:</div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {getPlatformName(platformSelector)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type:</div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {tradeType}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Coin:</div>
              <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {coinType}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}