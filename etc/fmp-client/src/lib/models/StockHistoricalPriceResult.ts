export interface StockHistoricalPriceResult {
  symbol: string;
  historical: HistoricalPrice[];
}

interface HistoricalPrice {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  adjClose: number,
  volume: number,
  unadjustedVolume: number,
  change: number,
  changePercent: number,
  vwap: number,
  label: string,
  changeOverTime: number
}