# Complete Code Files for Crypto Exchange Dashboard

## 1. Package.json - Dependencies and Scripts

```json
{
  "name": "crypto-exchange-dashboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && tsc server/index.ts --outDir dist --target es2022 --module esnext --moduleResolution bundler",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-query": "^5.8.4",
    "@types/express": "^4.17.21",
    "@types/node": "^20.8.10",
    "@types/react": "^18.2.33",
    "@types/react-dom": "^18.2.14",
    "@vitejs/plugin-react": "^4.1.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cmdk": "^0.2.0",
    "date-fns": "^2.30.0",
    "drizzle-orm": "^0.29.0",
    "drizzle-zod": "^0.5.1",
    "express": "^4.18.2",
    "framer-motion": "^10.16.5",
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.47.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss": "^3.3.5",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.1.2",
    "typescript": "^5.2.2",
    "vite": "^4.5.0",
    "wouter": "^2.12.1",
    "zod": "^3.22.4"
  }
}
```

## 2. Main Rate Settings Page

```typescript
// client/src/pages/rate-settings.tsx
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
```

## 3. Rate Setup Controls Component

```typescript
// client/src/components/RateSetupControls.tsx
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
```

## 4. My Offers Setup Component

```typescript
// client/src/components/MyOffersSetup.tsx
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
```

## 5. Database Schema

```typescript
// shared/schema.ts
import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const rateConfigurations = pgTable("rate_configurations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  buyingCurrency: text("buying_currency").notNull(),
  sellingRateSource: text("selling_rate_source").notNull(),
  buyFrom: text("buy_from").notNull(),
  markupType: text("markup_type").notNull(), // 'percentage' or 'flat'
  markupValue: decimal("markup_value", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  paymentMethod: text("payment_method").notNull(),
  platform: text("platform").notNull(),
  tradeType: text("trade_type").notNull(), // 'buy' or 'sell'
  coinType: text("coin_type").notNull(),
  rateConfigId: integer("rate_config_id").references(() => rateConfigurations.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRateConfigSchema = createInsertSchema(rateConfigurations).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type RateConfiguration = typeof rateConfigurations.$inferSelect;
export type InsertRateConfiguration = z.infer<typeof insertRateConfigSchema>;
export type Offer = typeof offers.$inferSelect;
export type InsertOffer = z.infer<typeof insertOfferSchema>;
```

## 6. Server Routes

```typescript
// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRateConfigSchema, insertOfferSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate configuration routes
  app.get("/api/rate-configurations", async (req, res) => {
    try {
      const configs = await storage.getRateConfigurations();
      res.json(configs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rate configurations" });
    }
  });

  app.get("/api/rate-configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const config = await storage.getRateConfiguration(id);
      if (!config) {
        return res.status(404).json({ message: "Rate configuration not found" });
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rate configuration" });
    }
  });

  app.post("/api/rate-configurations", async (req, res) => {
    try {
      const validatedData = insertRateConfigSchema.parse(req.body);
      const config = await storage.createRateConfiguration({
        ...validatedData,
        userId: 1, // Default user for demo
      });
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create rate configuration" });
    }
  });

  app.put("/api/rate-configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertRateConfigSchema.partial().parse(req.body);
      const config = await storage.updateRateConfiguration(id, validatedData);
      if (!config) {
        return res.status(404).json({ message: "Rate configuration not found" });
      }
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update rate configuration" });
    }
  });

  // Offers routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  app.post("/api/offers", async (req, res) => {
    try {
      const validatedData = insertOfferSchema.parse(req.body);
      const offer = await storage.createOffer({
        ...validatedData,
        userId: 1, // Default user for demo
      });
      res.json(offer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create offer" });
    }
  });

  // Mock external rate API
  app.get("/api/external-rates/:source", async (req, res) => {
    const source = req.params.source;
    const mockRates = {
      binance: 64300000,
      coinbase: 64250000,
      kraken: 64280000,
      bitstamp: 64320000,
    };
    
    const rate = mockRates[source as keyof typeof mockRates] || 64300000;
    res.json({ rate, source, timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

## 7. Dummy Data

```typescript
// client/src/examples/dummyData.ts
import type { Currency, Platform, PaymentMethod, CoinType } from "@/lib/types";

export const currencies: Currency[] = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

export const platforms: Platform[] = [
  { id: "binance", name: "Binance", type: "exchange" },
  { id: "coinbase", name: "Coinbase", type: "exchange" },
  { id: "kraken", name: "Kraken", type: "exchange" },
  { id: "bitstamp", name: "Bitstamp", type: "exchange" },
  { id: "paxful", name: "Paxful", type: "p2p" },
  { id: "noones", name: "Noones", type: "p2p" },
  { id: "localbitcoins", name: "LocalBitcoins", type: "p2p" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "bank", name: "Bank Transfer", icon: "bank" },
  { id: "card", name: "Credit/Debit Card", icon: "credit-card" },
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "cash", name: "Cash Payment", icon: "banknote" },
  { id: "mobile", name: "Mobile Money", icon: "smartphone" },
];

export const coinTypes: CoinType[] = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "ADA", name: "Cardano" },
];
```

## Installation Instructions

1. Download all files to your local directory
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open http://localhost:5000 in your browser

The application includes:
- Complete rate configuration system
- Real-time rate calculations
- Offer management
- Responsive design with Tailwind CSS
- TypeScript support
- Backend API with in-memory storage