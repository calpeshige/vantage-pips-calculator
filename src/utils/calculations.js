import { getPairConfig } from './currencyPairs';

export const calculatePips = (currencyPair, tradeType, entryPrice, exitPrice) => {
  if (!entryPrice || !exitPrice || entryPrice <= 0 || exitPrice <= 0) {
    return 0;
  }

  const pair = getPairConfig(currencyPair);
  
  let priceDiff = tradeType === "BUY" 
    ? exitPrice - entryPrice 
    : entryPrice - exitPrice;
  
  const pips = priceDiff / pair.pipSize;
  
  // 小数第1位のPips計算を全ての通貨ペアで実装
  return Math.round(pips * 10) / 10;
};

export const calculateProfit = (pips, lotSize, currencyPair, currentUSDJPYRate) => {
  if (!pips || !lotSize || lotSize <= 0) {
    return 0;
  }

  // USD/JPYレートが未定義の場合はデフォルト値を使用
  const usdJpyRate = currentUSDJPYRate || 150.0;

  const pair = getPairConfig(currencyPair);
  let profitInUSD;
  
  // JPY系通貨ペアの場合
  if (pair.quoteCurrency === "JPY") {
    // 1pipの価値（円）= pipSize × contractSize = 0.01 × 100,000 = 1,000円
    const pipValueInJPY = pair.pipSize * pair.contractSize;
    // USD換算 = 1,000円 ÷ 現在のUSD/JPYレート
    const pipValueInUSD = pipValueInJPY / usdJpyRate;
    profitInUSD = pips * pipValueInUSD * lotSize;
  }
  // USD系通貨ペアの場合
  else if (pair.quoteCurrency === "USD") {
    if (currencyPair === "GOLD") {
      // GOLD: 1 lot = 100 ounces, 1 pip = $0.10 movement
      profitInUSD = pips * 10 * lotSize; // $10 per pip per lot
    } else if (currencyPair.includes("BTC") || currencyPair.includes("ETH")) {
      // 暗号通貨: 1 pip = $0.10
      profitInUSD = pips * pair.pipSize * lotSize;
    } else {
      // EUR/USD等: 1 pip = $10 per lot
      profitInUSD = pips * 10 * lotSize;
    }
  }
  
  return Math.round(profitInUSD * 100) / 100;
};

export const calculateTradeResults = (trade, currentUSDJPYRate) => {
  if (!trade.currencyPair || !trade.entryPrice || !trade.exitPrice || !trade.lotSize) {
    return {
      ...trade,
      pips: 0,
      profitUSD: 0,
      profitJPY: 0
    };
  }

  const pips = calculatePips(
    trade.currencyPair,
    trade.tradeType,
    parseFloat(trade.entryPrice),
    parseFloat(trade.exitPrice)
  );

  const profitUSD = calculateProfit(pips, parseFloat(trade.lotSize), trade.currencyPair, currentUSDJPYRate);
  const profitJPY = profitUSD * (currentUSDJPYRate || 150.0);

  return {
    ...trade,
    pips,
    profitUSD,
    profitJPY
  };
};

export const formatPrice = (price, decimals) => {
  if (!price) return '';
  return parseFloat(price).toFixed(decimals);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};