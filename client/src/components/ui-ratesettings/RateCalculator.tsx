import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface RateCalculatorProps {
  baseRate: number;
  markup: number;
  markupType: "percentage" | "flat";
  currency: string;
}

export default function RateCalculator({ baseRate, markup, markupType, currency }: RateCalculatorProps) {
  const calculatedRate = baseRate + markup;
  const effectiveMarkup = ((markup / baseRate) * 100).toFixed(2);

  const formatCurrency = (amount: number) => {
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-orange-500" />
          <span>Rate Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base Rate:</span>
            <span className="text-lg font-semibold">{formatCurrency(baseRate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Markup:</span>
            <span className="text-lg font-semibold text-green-600">
              {markupType === "percentage" ? `${markup}%` : formatCurrency(markup)}
            </span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium">Final Rate:</span>
              <span className="text-xl font-bold text-orange-600">{formatCurrency(calculatedRate)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Effective Markup:</span>
              <span className="text-sm font-medium text-blue-600">{effectiveMarkup}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}