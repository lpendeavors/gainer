export interface StockHistoricalDividendResult {
  symbol: string;
  historical: HistoricalDividend[];
}

interface HistoricalDividend {
  date: string,
  label: string,
  adjDividend: number,
  dividend: number,
  recordDate: string,
  paymentDate: string,
  declarationDate: string
}