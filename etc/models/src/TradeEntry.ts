export interface ITradeEntry {
  symbol: string;
  entryPrice: number;
  stopLossPrice: number;
  riskPerShare: number;
  sharesToBuy: number;
}