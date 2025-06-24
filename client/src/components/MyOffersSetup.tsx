import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { platforms, paymentMethods, coinTypes } from "@/examples/dummyData";
import type { InsertOffer } from "@shared/schema";

export default function MyOffersSetup() {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [platformSelector, setPlatformSelector] = useState("binance");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [coinType, setCoinType] = useState("BTC");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Create offer mutation
  const createOfferMutation = useMutation({
    mutationFn: async (offer: InsertOffer) => {
      const response = await apiRequest("POST", "/api/offers", offer);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      toast({
        title: "Success",
        description: "Offer created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create offer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateOffer = () => {
    const offer: InsertOffer = {
      paymentMethod,
      platform: platformSelector,
      tradeType,
      coinType,
      rateConfigId: null, // Will be linked to active rate config
      isActive: true,
    };

    createOfferMutation.mutate(offer);
  };

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Handshake className="h-5 w-5 text-orange-500" />
          <span>My Offers Setup Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
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
              <label className="text-sm font-medium text-gray-700">Platform Selector</label>
              <Select value={platformSelector} onValueChange={setPlatformSelector}>
                <SelectTrigger>
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
              <label className="text-sm font-medium text-gray-700">Trade Type</label>
              <div className="flex">
                <Button
                  type="button"
                  variant={tradeType === "buy" ? "default" : "outline"}
                  className={`flex-1 rounded-r-none ${tradeType === "buy" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={tradeType === "sell" ? "default" : "outline"}
                  className={`flex-1 rounded-l-none ${tradeType === "sell" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
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
                <SelectTrigger>
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
            onClick={handleCreateOffer}
            disabled={createOfferMutation.isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            {createOfferMutation.isPending ? "Creating..." : "Create offer"}
          </Button>
        </div>

        {/* Current Configuration */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Payment:</div>
              <div className="text-base font-semibold text-gray-900">
                {getPaymentMethodName(paymentMethod)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Platform:</div>
              <div className="text-base font-semibold text-gray-900">
                {getPlatformName(platformSelector)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Type:</div>
              <div className="text-base font-semibold text-gray-900 capitalize">
                {tradeType}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Coin:</div>
              <div className="text-base font-semibold text-gray-900">
                {coinType}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
