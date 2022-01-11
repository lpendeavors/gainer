import { makeRequest, generateJson } from './utilities';
import financial from './financial';
import { CompanyProfileResult, CompanyRatingResult, StockHistoricalDividendResult, StockHistoricalSplitResult, StockIntradayPriceResult, StockListResult, StockNewsResult, StockPriceResult, StockQuoteResult } from './models';
import { StockHistoricalPriceResult } from './models/StockHistoricalPriceResult';

export default (stock: string) => {
  return {
    financial: financial(stock),
    list: () => makeRequest('stock/list') as Promise<StockListResult[]>,
    quote: () => makeRequest('quote', generateJson(stock)) as Promise<StockQuoteResult[]>,
    rating: () => makeRequest('rating', generateJson(stock)) as Promise<CompanyRatingResult[]>,
    profile: () => makeRequest('profile', generateJson(stock)) as Promise<CompanyProfileResult[]>,
    current_price: () => makeRequest('quote-short', generateJson(stock)) as Promise<StockPriceResult[]>,
    intraday: ({ interval }: { interval : '1m' | '5m' |'15m' | '30m' | '1h' | '4h' }) => makeRequest(`historical-chart/${interval}`, generateJson(stock)) as Promise<StockIntradayPriceResult[]>,
    news: ({ tickers, limit }: { tickers: string, limit?: number}) => makeRequest('stock_news', generateJson(null, { tickers, limit })) as Promise<StockNewsResult[]>,
    history: ({ start_date, end_date, data_type, limit }: { start_date?: string, end_date?: string, data_type?: 'line' | 'bar', limit?: number }) => makeRequest('historical-price-full', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })) as Promise<StockHistoricalPriceResult>,
    dividend_history: ({ start_date, end_date, data_type, limit }: { start_date?: string, end_date?: string, data_type?: 'line' | 'bar', limit?: number }) => makeRequest('historical-price-full/stock_dividend', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })) as Promise<StockHistoricalDividendResult>,
    split_history: ({ start_date, end_date, data_type, limit }: { start_date?: string, end_date?: string, data_type?: 'line' | 'bar', limit?: number }) => makeRequest('historical-price-full/stock_split', generateJson(stock, { from: start_date, to: end_date, serietype: data_type, timeseries: limit })) as Promise<StockHistoricalSplitResult>,
  }
}