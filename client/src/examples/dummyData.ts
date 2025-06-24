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
