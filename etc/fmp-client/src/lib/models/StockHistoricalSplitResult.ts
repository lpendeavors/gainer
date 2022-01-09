export interface StockHistoricalSplitResult {
  symbol: string;
  historical: HistoricalSplit[];
}

interface HistoricalSplit {
  date: string,
  label: string,
  numerator: number,
  denominator: number
}