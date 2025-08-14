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

export const calculateProfit = (pips, lotSize, currencyPair) => {
  if (!pips || !lotSize || lotSize <= 0) {
    return 0;
  }

  const pair = getPairConfig(currencyPair);
  
  // Special handling for GOLD - 1 lot = 100 ounces
  if (currencyPair === "GOLD") {
    let profitInUSD = pips * pair.pipValuePerLot * 100 * lotSize; // pips * pipValue * 100 ounces * lot size
    return Math.round(profitInUSD * 100) / 100;
  }

  let profitInUSD = pips * pair.pipValuePerLot * lotSize;
  
  return Math.round(profitInUSD * 100) / 100;
};

export const calculateTradeResults = (trade) => {
  if (!trade.currencyPair || !trade.entryPrice || !trade.exitPrice || !trade.lotSize) {
    return {
      ...trade,
      pips: 0,
      profitUSD: 0
    };
  }

  const pips = calculatePips(
    trade.currencyPair,
    trade.tradeType,
    parseFloat(trade.entryPrice),
    parseFloat(trade.exitPrice)
  );

  const profitUSD = calculateProfit(pips, parseFloat(trade.lotSize), trade.currencyPair);

  return {
    ...trade,
    pips,
    profitUSD
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