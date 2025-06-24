export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Platform {
  id: string;
  name: string;
  type: 'exchange' | 'p2p';
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface CoinType {
  symbol: string;
  name: string;
}

export const currencies: Currency[] = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
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
  { id: "wise", name: "Wise Transfer", icon: "globe" },
];

export const coinTypes: CoinType[] = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "XRP", name: "Ripple" },
  { symbol: "DOT", name: "Polkadot" },
];