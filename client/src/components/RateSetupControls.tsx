import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { currencies, platforms } from "@/examples/dummyData";
import type { ExternalRate, RateConfiguration, InsertRateConfiguration } from "@shared/schema";

interface RateSetupControlsProps {
  onConfigurationChange?: (config: RateConfiguration) => void;
}

export default function RateSetupControls({ onConfigurationChange }: RateSetupControlsProps) {
  const [buyingCurrency, setBuyingCurrency] = useState("NGN");
  const [sellingRateSource, setSellingRateSource] = useState("binance");
  const [buyFrom, setBuyFrom] = useState("binance");
  const [markupType, setMarkupType] = useState<"percentage" | "flat">("percentage");
  const [markupValue, setMarkupValue] = useState(2.5);

  const queryClient = useQueryClient();

  // Fetch external rate
  const { data: externalRate } = useQuery<ExternalRate>({
    queryKey: ["/api/external-rates", sellingRateSource],
    enabled: !!sellingRateSource,
  });

  // Save rate configuration mutation
  const saveConfigMutation = useMutation({
    mutationFn: async (config: InsertRateConfiguration) => {
      const response = await apiRequest("POST", "/api/rate-configurations", config);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/rate-configurations"] });
      onConfigurationChange?.(data);
    },
  });

  // Calculate rates
  const baseRate = externalRate?.rate || 64300000;
  const markup = markupType === "percentage" 
    ? baseRate * (markupValue / 100)
    : markupValue;
  const calculatedRate = baseRate + markup;

  // Format currency
  const formatCurrency = (amount: number) => {
    const currency = currencies.find(c => c.code === buyingCurrency);
    return `${currency?.symbol || "₦"}${amount.toLocaleString()}`;
  };

  // Auto-save configuration
  useEffect(() => {
    const config: InsertRateConfiguration = {
      buyingCurrency,
      sellingRateSource,
      buyFrom,
      markupType,
      markupValue: markupValue.toString(),
      isActive: true,
    };

    const timeoutId = setTimeout(() => {
      saveConfigMutation.mutate(config);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [buyingCurrency, sellingRateSource, buyFrom, markupType, markupValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-orange-500" />
          <span>Rate Setup Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rate Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Buying Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Buying Currency</label>
            <Select value={buyingCurrency} onValueChange={setBuyingCurrency}>
              <SelectTrigger>
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
            <label className="text-sm font-medium text-gray-700">Selling Rate Source</label>
            <Select value={sellingRateSource} onValueChange={setSellingRateSource}>
              <SelectTrigger>
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
            <label className="text-sm font-medium text-gray-700">Buy From</label>
            <Select value={buyFrom} onValueChange={setBuyFrom}>
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

          {/* Markup */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Markup (%)</label>
            <div className="flex">
              <Button
                type="button"
                variant={markupType === "percentage" ? "default" : "outline"}
                className={`rounded-r-none ${markupType === "percentage" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                onClick={() => setMarkupType("percentage")}
              >
                Percentage (%)
              </Button>
              <Button
                type="button"
                variant={markupType === "flat" ? "default" : "outline"}
                className={`rounded-l-none ${markupType === "flat" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
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
              <span className="text-sm text-gray-600">Base Rate ({sellingRateSource}):</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(baseRate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Markup ({markupType === "percentage" ? `${markupValue}%` : "flat"}):</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-green-600">{formatCurrency(markup)}</span>
                {markupType === "percentage" && (
                  <>
                    <span className="text-xs text-gray-500">({markupValue}%)</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Competitive
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Calculated Rate:</div>
            <div className="text-3xl font-bold text-orange-600">{formatCurrency(calculatedRate)}</div>
            <div className="text-sm text-gray-500">per BTC</div>
          </div>
        </div>

        {/* Configuration Settings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">CURRENCY</div>
              <div className="text-lg font-semibold text-gray-900">{buyingCurrency}</div>
              <div className="text-sm text-gray-500">
                {currencies.find(c => c.code === buyingCurrency)?.name}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">PLATFORM</div>
              <div className="text-lg font-semibold text-gray-900">
                {platforms.find(p => p.id === sellingRateSource)?.name}
              </div>
              <div className="text-sm text-gray-500">Rate Source</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">PLATFORM</div>
              <div className="text-lg font-semibold text-gray-900">
                {platforms.find(p => p.id === buyFrom)?.name}
              </div>
              <div className="text-sm text-gray-500">Buy From</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">MARKUP</div>
              <div className="text-lg font-semibold text-gray-900">
                {markupType === "percentage" ? `${markupValue}%` : formatCurrency(markupValue)}
              </div>
              <div className="text-sm text-gray-500">
                {markupType === "percentage" ? "Percentage Mode" : "Flat Amount Mode"}
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Profit per BTC:</span>
              <span className="text-sm font-semibold text-green-600">{formatCurrency(markup)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Effective Markup:</span>
              <span className="text-sm font-semibold text-blue-600">
                {((markup / baseRate) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
