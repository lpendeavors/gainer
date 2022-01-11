import fmp, { StockNewsResult, StockQuoteResult, StockHistoricalPriceResult, CompanyRatingResult } from "@leadofftech/fmp-client";

export const getSymbols =  async (symbols: string): Promise<StockQuoteResult[]> => {
  return await fmp.stock(symbols).quote();
}

export const getNews = async (symbols: string): Promise<StockNewsResult[]> => {
  return await fmp.stock(symbols).news({ tickers: symbols, limit: 10 });
}

export const getHistory = async (symbol: string, start_date?: string, end_date?: string, data_type?: 'line' | 'bar', limit?: number): Promise<StockHistoricalPriceResult> => {
  let params = {};
  if (start_date !== undefined) params = { ...params, start_date };
  if (end_date !== undefined) params = { ...params, end_date };
  if (data_type !== undefined) params = { ...params, data_type };
  if (limit !== undefined) params = { ...params, limit }; 
  return await fmp.stock(symbol).history(params);
}

export const getRating = async (symbol: string): Promise<CompanyRatingResult[]> => {
  return await fmp.stock(symbol).rating();
}