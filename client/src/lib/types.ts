export interface ExternalRate {
  rate: number;
  source: string;
  timestamp: string;
}

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
