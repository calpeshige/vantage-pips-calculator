export const currencyPairs = {
  "USD/JPY": {
    symbol: "USD/JPY",
    pipSize: 0.01,
    decimals: 3,
    contractSize: 100000,
    pipValuePerLot: 6.76, // $6.76 per pip (1000 JPY / 147.82)
    quoteCurrency: "JPY"
  },
  "EUR/JPY": {
    symbol: "EUR/JPY",
    pipSize: 0.01,
    decimals: 3,
    contractSize: 100000,
    pipValuePerLot: 6.76, // $6.76 per pip (1000 JPY / 147.82)
    quoteCurrency: "JPY"
  },
  "EUR/USD": {
    symbol: "EUR/USD",
    pipSize: 0.0001,
    decimals: 5,
    contractSize: 100000,
    pipValuePerLot: 10.00, // $10.00 per pip
    quoteCurrency: "USD"
  },
  "GBP/JPY": {
    symbol: "GBP/JPY",
    pipSize: 0.01,
    decimals: 3,
    contractSize: 100000,
    pipValuePerLot: 6.76, // $6.76 per pip (1000 JPY / 147.82)
    quoteCurrency: "JPY"
  },
  "GOLD": {
    symbol: "GOLD",
    pipSize: 0.10, // Vantage Trading: 1 pip = $0.10 price movement
    decimals: 1,
    contractSize: 100,
    pipValuePerLot: 0.10, // $0.10 per pip (Vantage Trading specification)
    quoteCurrency: "USD"
  },
  "BTCUSD": {
    symbol: "BTCUSD",
    pipSize: 0.10, // 1 pip = 0.10 (小数第1位)
    decimals: 1,
    contractSize: 1,
    pipValuePerLot: 0.10, // $0.10 per pip
    quoteCurrency: "USD"
  },
  "BTCJPY": {
    symbol: "BTCJPY",
    pipSize: 1.0, // 1 pip = 1.0 (小数第0位)
    decimals: 0,
    contractSize: 1,
    pipValuePerLot: 0.00676, // $0.00676 per pip (1 JPY / 147.82)
    quoteCurrency: "JPY"
  },
  "ETHUSD": {
    symbol: "ETHUSD",
    pipSize: 0.10, // 1 pip = 0.10 (小数第1位)
    decimals: 1,
    contractSize: 1,
    pipValuePerLot: 0.10, // $0.10 per pip
    quoteCurrency: "USD"
  },
  "ETHJPY": {
    symbol: "ETHJPY",
    pipSize: 1.0, // 1 pip = 1.0 (小数第0位)
    decimals: 0,
    contractSize: 1,
    pipValuePerLot: 0.00676, // $0.00676 per pip (1 JPY / 147.82)
    quoteCurrency: "JPY"
  }
};

export const getPairConfig = (pairSymbol) => {
  return currencyPairs[pairSymbol] || currencyPairs["EUR/USD"];
};

export const getCurrencyPairsList = () => {
  return Object.keys(currencyPairs);
};