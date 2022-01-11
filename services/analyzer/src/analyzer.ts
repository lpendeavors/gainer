import { CronJob } from "cron";
import * as dataProvider from "./data";
import * as dotenv from "dotenv";
import { isBreakingOutAfterConsolidation } from "./strategy/breakout";

dotenv.config();

const analyzerJob = new CronJob('*/3 * * * *', async () => {
  try {
    findNewTrades();
    maintainExistingTrades();
  } catch (e) {
    console.error(e);
  }
});

if (!analyzerJob.running) {
  analyzerJob.start();
}

const findNewTrades = async () => {
  const watchlists = await dataProvider.getWatchlists();
  const symbols = [];
  for (const list of watchlists) {
    for (const symbol of list.symbols) {
      symbols.push(symbol);
    }
  }
  const uniqueSymbols = [...new Set(symbols)];
  for (const symbol of uniqueSymbols) {
    const history = await dataProvider.getStockHistory(symbol);
    if (isBreakingOutAfterConsolidation(history)) {
      if (await getDecisionFromRating(symbol)) {
        const recentCloses = history.slice(0, 8).map(h => h.close);
        const entrySuggestion = { symbol, ...calculateEntry(recentCloses) };
        console.log(entrySuggestion);
      }
    }
  }
}

const getDecisionFromRating = async (symbol: string): Promise<boolean> => {
  const rating = await dataProvider.getStockRating(symbol);
  if (rating.length) {
    return rating[0].ratingScore >= 4;
  }
  return false;
}

const calculateEntry = (recentCloses: number[]): EntryDetails => {
  const maxClose = Math.max(...recentCloses);
  const minClose = Math.min(...recentCloses);

  return <EntryDetails>{
    entryPrice: maxClose + .03,
    stopLossPrice: minClose - .03,
    riskPerShare: (maxClose + .03) - (minClose - .03),
    sharesToBuy: Math.floor(100 / ((maxClose + .03) - (minClose - .03)))
  };
}

const maintainExistingTrades = async () => {

}

interface EntryDetails {
  entryPrice: number;
  stopLossPrice: number;
  riskPerShare: number;
  sharesToBuy: number;
}