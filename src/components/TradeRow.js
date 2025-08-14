import React from 'react';
import { getCurrencyPairsList, getPairConfig } from '../utils/currencyPairs';
import { formatCurrency } from '../utils/calculations';

const TradeRow = ({ trade, onUpdate, onDelete }) => {
  const handleInputChange = (field, value) => {
    onUpdate(trade.id, field, value);
  };

  const currencyPairs = getCurrencyPairsList();
  const pairConfig = getPairConfig(trade.currencyPair);

  return (
    <tr>
      <td>{trade.id}</td>
      
      {/* 通貨ペア選択 */}
      <td>
        <select
          value={trade.currencyPair}
          onChange={(e) => handleInputChange('currencyPair', e.target.value)}
          className="select"
        >
          {currencyPairs.map(pair => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
      </td>

      {/* Buy/Sell選択 */}
      <td>
        <select
          value={trade.tradeType}
          onChange={(e) => handleInputChange('tradeType', e.target.value)}
          className="select"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
      </td>

      {/* エントリー価格 */}
      <td>
        <input
          type="number"
          step={pairConfig.pipSize}
          value={trade.entryPrice}
          onChange={(e) => handleInputChange('entryPrice', e.target.value)}
          placeholder="0.00000"
          className="input input-right"
        />
      </td>

      {/* エグジット価格 */}
      <td>
        <input
          type="number"
          step={pairConfig.pipSize}
          value={trade.exitPrice}
          onChange={(e) => handleInputChange('exitPrice', e.target.value)}
          placeholder="0.00000"
          className="input input-right"
        />
      </td>

      {/* ロット数 */}
      <td>
        <input
          type="number"
          step="0.01"
          min="0.01"
          max="100"
          value={trade.lotSize}
          onChange={(e) => handleInputChange('lotSize', e.target.value)}
          className="input input-right"
        />
      </td>

      {/* Pips表示 */}
      <td className="text-center">
        <span className={`font-semibold ${trade.pips >= 0 ? 'text-green' : 'text-red'}`}>
          {trade.pips >= 0 ? '+' : ''}{trade.currencyPair === 'GOLD' ? trade.pips.toFixed(1) : trade.pips}
        </span>
      </td>

      {/* 損益表示 */}
      <td className="text-right">
        <div className={`font-semibold ${trade.profitUSD >= 0 ? 'text-green' : 'text-red'}`}>
          <div>{trade.profitUSD >= 0 ? '+' : ''}{formatCurrency(trade.profitUSD)}</div>
          <div style={{fontSize: '0.875rem', marginTop: '1px'}}>
            {trade.profitJPY >= 0 ? '+' : ''}¥{Math.round(trade.profitJPY || 0).toLocaleString()}
          </div>
        </div>
      </td>

      {/* 削除ボタン */}
      <td className="text-center">
        <button
          onClick={() => onDelete(trade.id)}
          className="btn-delete"
          title="削除"
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

export default TradeRow;