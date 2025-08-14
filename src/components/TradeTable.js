import React, { useState } from 'react';
import TradeRow from './TradeRow';
import { formatCurrency } from '../utils/calculations';

const TradeTable = ({ trades, onUpdateTrade, onDeleteTrade, onAddTrade }) => {
  const [usdJpyRate, setUsdJpyRate] = useState(150.00);
  const totalProfit = trades.reduce((sum, trade) => sum + (trade.profitUSD || 0), 0);
  const totalPips = trades.reduce((sum, trade) => sum + (trade.pips || 0), 0);
  const totalProfitJPY = totalProfit * usdJpyRate;

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>通貨ペア</th>
              <th>Buy/Sell</th>
              <th>エントリー</th>
              <th>エグジット</th>
              <th>ロット</th>
              <th className="text-center">Pips</th>
              <th className="text-right">損益 (USD)</th>
              <th className="text-center">削除</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-state">
                  取引がありません。下のボタンから新規取引を追加してください。
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <TradeRow
                  key={trade.id}
                  trade={trade}
                  onUpdate={onUpdateTrade}
                  onDelete={onDeleteTrade}
                />
              ))
            )}
          </tbody>
          
          {/* 合計行 */}
          {trades.length > 0 && (
            <tfoot>
              <tr className="total-row">
                <td colSpan="6" className="text-right font-semibold">
                  合計Pips / 合計損益:
                </td>
                <td className="text-center">
                  <span className={`font-semibold ${totalPips >= 0 ? 'text-green' : 'text-red'}`}>
                    {totalPips >= 0 ? '+' : ''}{totalPips.toFixed(1)} pips
                  </span>
                </td>
                <td className="text-right">
                  <div className={`total-amount ${totalProfit >= 0 ? 'text-green' : 'text-red'}`}>
                    <div>{totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}</div>
                    <div style={{fontSize: '0.875rem', marginTop: '2px'}}>
                      {totalProfitJPY >= 0 ? '+' : ''}¥{Math.round(totalProfitJPY).toLocaleString()}
                    </div>
                  </div>
                </td>
                <td></td>
              </tr>
              <tr className="total-row" style={{borderTop: '1px solid #e5e7eb'}}>
                <td colSpan="7" className="text-right font-semibold" style={{fontSize: '0.875rem', padding: '0.5rem 1rem'}}>
                  USD/JPY レート:
                </td>
                <td className="text-right" style={{padding: '0.5rem 1rem'}}>
                  <input
                    type="number"
                    step="0.01"
                    min="50"
                    max="200"
                    value={usdJpyRate}
                    onChange={(e) => setUsdJpyRate(parseFloat(e.target.value) || 150)}
                    className="input input-right"
                    style={{width: '80px', fontSize: '0.875rem'}}
                  />
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      
      {/* 新規取引追加ボタン */}
      <div className="text-center">
        <button
          onClick={onAddTrade}
          className="btn btn-primary"
        >
          + 新規取引を追加
        </button>
      </div>
    </div>
  );
};

export default TradeTable;