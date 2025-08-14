import React, { useState, useCallback, useEffect } from 'react';
import TradeTable from './components/TradeTable';
import { calculateTradeResults } from './utils/calculations';

function App() {
  const [trades, setTrades] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [usdJpyRate, setUsdJpyRate] = useState(150.00);

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedTrades = localStorage.getItem('vantage-trades');
    const savedNextId = localStorage.getItem('vantage-next-id');
    const savedUsdJpyRate = localStorage.getItem('vantage-usdjpy-rate');
    
    if (savedTrades) {
      try {
        const parsedTrades = JSON.parse(savedTrades);
        setTrades(parsedTrades);
      } catch (error) {
        console.error('Failed to load trades from localStorage:', error);
      }
    }
    
    if (savedNextId) {
      setNextId(parseInt(savedNextId, 10));
    }
    
    if (savedUsdJpyRate) {
      setUsdJpyRate(parseFloat(savedUsdJpyRate));
    }
  }, []);

  // ローカルストレージにデータを保存
  useEffect(() => {
    localStorage.setItem('vantage-trades', JSON.stringify(trades));
    localStorage.setItem('vantage-next-id', nextId.toString());
    localStorage.setItem('vantage-usdjpy-rate', usdJpyRate.toString());
  }, [trades, nextId, usdJpyRate]);

  const addTrade = useCallback(() => {
    setTrades(prev => {
      // 前の取引の情報を取得
      const lastTrade = prev.length > 0 ? prev[prev.length - 1] : null;
      
      const newTrade = {
        id: nextId,
        currencyPair: lastTrade ? lastTrade.currencyPair : "EUR/USD",
        tradeType: lastTrade ? (lastTrade.tradeType === "BUY" ? "SELL" : "BUY") : "BUY",
        entryPrice: lastTrade && lastTrade.exitPrice ? lastTrade.exitPrice : "",
        exitPrice: "",
        lotSize: "1.0",
        pips: 0,
        profitUSD: 0
      };
      
      return [...prev, newTrade];
    });
    setNextId(prev => prev + 1);
  }, [nextId]);

  const updateTrade = useCallback((id, field, value) => {
    setTrades(prev => 
      prev.map(trade => {
        if (trade.id === id) {
          const updatedTrade = { ...trade, [field]: value };
          return calculateTradeResults(updatedTrade, usdJpyRate);
        }
        return trade;
      })
    );
  }, [usdJpyRate]);

  // USD/JPYレート変更時に全ての取引を再計算
  useEffect(() => {
    setTrades(prev => 
      prev.map(trade => calculateTradeResults(trade, usdJpyRate))
    );
  }, [usdJpyRate]);

  const deleteTrade = useCallback((id) => {
    setTrades(prev => prev.filter(trade => trade.id !== id));
  }, []);

  const clearAllTrades = useCallback(() => {
    if (window.confirm('全ての取引データを削除しますか？この操作は元に戻せません。')) {
      setTrades([]);
      setNextId(1);
    }
  }, []);

  return (
    <div className="container">
      {/* ヘッダー */}
      <div className="header">
        <h1 className="title">
          Vantage FX Pips計算機
        </h1>
        <p className="subtitle">
          複数取引のPips・損益を同時に計算・管理
        </p>
        <div className="currency-info">
          対応通貨ペア: USD/JPY, EUR/JPY, EUR/USD, GOLD, BTCUSD, BTCJPY, ETHUSD, ETHJPY
        </div>
      </div>

      {/* コントロールボタン */}
      {trades.length > 0 && (
        <div className="controls">
          <button
            onClick={clearAllTrades}
            className="btn btn-danger"
          >
            全データをクリア
          </button>
        </div>
      )}

      {/* メインテーブル */}
      <TradeTable
        trades={trades}
        onUpdateTrade={updateTrade}
        onDeleteTrade={deleteTrade}
        onAddTrade={addTrade}
        usdJpyRate={usdJpyRate}
        onUsdJpyRateChange={setUsdJpyRate}
      />

      {/* フッター */}
      <div className="footer">
        <p>
          ※ 本アプリはVantage Trading仕様に基づいて設計されています
        </p>
        <p>
          ※ JPY換算は設定されたUSD/JPYレートを使用します（実際の取引では最新レートをご確認ください）
        </p>
      </div>
    </div>
  );
}

export default App;
