import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Handshake, CreditCard } from "lucide-react";

export default function MyOffersSetupPanel() {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [platformSelector, setPlatformSelector] = useState("binance");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [coinType, setCoinType] = useState("BTC");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Handshake className="h-5 w-5 text-orange-500" />
        <span className="text-lg font-semibold text-gray-900">My Offers Setup Panel</span>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white border-gray-300">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="cash">Cash Payment</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Platform Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Platform Selector</label>
              <Select value={platformSelector} onValueChange={setPlatformSelector}>
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trade Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Trade Type</label>
              <div className="flex">
                <Button
                  type="button"
                  variant={tradeType === "buy" ? "default" : "outline"}
                  className={`flex-1 rounded-r-none text-sm px-4 py-2 h-auto ${tradeType === "buy" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border-gray-300 text-gray-700"}`}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={tradeType === "sell" ? "default" : "outline"}
                  className={`flex-1 rounded-l-none text-sm px-4 py-2 h-auto ${tradeType === "sell" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border-gray-300 text-gray-700"}`}
                  onClick={() => setTradeType("sell")}
                >
                  Sell
                </Button>
              </div>
            </div>

            {/* Coin Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Coin Type</label>
              <Select value={coinType} onValueChange={setCoinType}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                  <SelectItem value="ETH">ETH - Ethereum</SelectItem>
                  <SelectItem value="USDT">USDT - Tether</SelectItem>
                  <SelectItem value="BNB">BNB - Binance Coin</SelectItem>
                  <SelectItem value="ADA">ADA - Cardano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Create Offer Button */}
        <div className="mt-8">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 text-lg">
            Create offer
          </Button>
        </div>

        {/* Current Configuration */}
        <div className="bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Configuration:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Payment:</div>
              <div className="text-base font-semibold text-gray-900">Bank Transfer</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Platform:</div>
              <div className="text-base font-semibold text-gray-900">Binance</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Type:</div>
              <div className="text-base font-semibold text-gray-900">Buy</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Coin:</div>
              <div className="text-base font-semibold text-gray-900">BTC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}