import * as express from "express";
import * as stockDataProvider from './StockDataProvider';

export const StockController = express.Router();

StockController.get('/:symbols', async (req, res, next) => {
  const quotes = await stockDataProvider.getSymbols(req.params.symbols);
  res.send(quotes);
});

StockController.get('/:symbols/news', async (req, res, next) => {
  const news = await stockDataProvider.getNews(req.params.symbols);
  res.send(news);
});

StockController.get('/:symbol/history', async (req, res, next) => {
  const history = await stockDataProvider.getHistory(
    req.params.symbol,
    `${req.query.start_date}`,
    `${req.query.end_date}`,
    req.query.data_type === 'line' ? 'line' : 'bar',
    req.query.limit === undefined ? undefined : parseInt(`${req.query.limit}`)
  );
  res.send(history);
});