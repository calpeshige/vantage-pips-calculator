# Vantage FX Pips計算機

Vantage Trading仕様に基づいたFX取引のPips・損益計算アプリケーションです。複数の取引を同時に管理・計算できます。

## 🚀 特徴

- **複数取引の同時計算**: テーブル形式で複数の取引を一度に管理
- **リアルタイム計算**: 価格やロット数の変更に応じて自動計算
- **Vantage Trading対応**: Vantage Tradingの仕様に準拠した正確な計算
- **対応通貨ペア**: USD/JPY, EUR/JPY, EUR/USD, GOLD
- **データ永続化**: LocalStorageによる自動保存
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 📱 デモ

アプリケーションは以下のURLで利用可能です：
- 開発サーバー: http://localhost:3000
- プロダクションビルド: `build`フォルダを静的サーバーでホスト

## 🛠️ 技術スタック

- **React** (18+)
- **JavaScript** (ES6+)
- **CSS3** (カスタムスタイル)
- **LocalStorage** (データ永続化)

## 📦 インストール・起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# プロダクションビルド
npm run build
```

## 🎯 使用方法

1. **新規取引追加**: 「+ 新規取引を追加」ボタンをクリック
2. **通貨ペア選択**: ドロップダウンから取引する通貨ペアを選択
3. **Buy/Sell選択**: 取引の方向を選択
4. **価格入力**: エントリー価格とエグジット価格を入力
5. **ロット数入力**: 取引するロット数を入力
6. **自動計算**: Pipsと損益が自動的に計算・表示されます

## 💰 計算仕様

### 対応通貨ペア
- **USD/JPY**: 1pip = 0.01, 3桁表示
- **EUR/JPY**: 1pip = 0.01, 3桁表示
- **EUR/USD**: 1pip = 0.0001, 5桁表示
- **GOLD**: 1pip = 0.01, 2桁表示

### 損益計算
- 基本計算式: `(Pips × ロット数 × 契約サイズ × pip値)`
- JPY建て通貨ペアは固定レート（150.00）でUSD換算
- すべての損益はUSD表示

## 🗂️ プロジェクト構成

```
src/
├── components/
│   ├── TradeTable.js    # メインテーブルコンポーネント
│   └── TradeRow.js      # 取引行コンポーネント
├── utils/
│   ├── currencyPairs.js # 通貨ペア定義
│   └── calculations.js  # 計算ロジック
├── styles.css           # カスタムCSS
├── App.js              # メインアプリケーション
└── index.js            # エントリーポイント
```

## 🔧 カスタマイズ

### 通貨ペアの追加
`src/utils/currencyPairs.js`ファイルで新しい通貨ペアを追加できます：

```javascript
"NEW/PAIR": {
  symbol: "NEW/PAIR",
  pipSize: 0.0001,
  decimals: 5,
  contractSize: 100000,
  pipValuePerLot: 10,
  quoteCurrency: "USD"
}
```

### 換算レートの変更
`src/utils/calculations.js`の`USDJPY_RATE`定数を変更してJPY/USD換算レートを調整できます。

## 📱 デプロイメント

### 静的サーバーでのデプロイ
```bash
npm run build
npm install -g serve
serve -s build
```

### Netlify/Vercel等のサービス
1. GitHubリポジトリにプッシュ
2. 各サービスでプロジェクトをインポート
3. ビルドコマンド: `npm run build`
4. パブリッシュディレクトリ: `build`

## ⚠️ 注意事項

- 本アプリはVantage Trading仕様に基づいて設計されていますが、実際の取引では最新の仕様をご確認ください
- JPY換算レートは150.00で固定されています
- リアルタイム為替レートは含まれていません
- 教育・計算目的での使用を推奨します

## 📄 ライセンス

MIT License
