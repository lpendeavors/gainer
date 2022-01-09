import fmp from "@gainer/fmp-client";
import { StockNewsResult, StockQuoteResult, StockHistoricalPriceResult } from "@gainer/fmp-client/dist/lib/models";

export const getSymbols =  async (symbols: string): Promise<StockQuoteResult[]> => {
  return await fmp.stock(symbols).quote();
}

export const getNews = async (symbols: string): Promise<StockNewsResult[]> => {
  return await fmp.stock(symbols).news({ tickers: symbols, limit: 10 });
}

export const getHistory = async (symbol: string, start_date?: string, end_date?: string, data_type?: 'line' | 'bar', limit?: number): Promise<StockHistoricalPriceResult> => {
  let params = {};
  
  if (start_date) params = { ...params, start_date };
  if (end_date) params = { ...params, end_date };
  if (data_type) params = { ...params, data_type };
  if (limit) params = { ...params, limit };

  return await fmp.stock(symbol).history({ data_type, limit });
}