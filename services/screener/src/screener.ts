import { CronJob } from "cron";
import { FinvizCrawler } from "./crawler";
import * as watchListProvider from './data';

const crawler = new FinvizCrawler();

const screenerJob = new CronJob('* * * * *', async () => {
  try {
    await crawlWatchlists();
  } catch (e) {
    console.error(e);
  }
});

if (!screenerJob.running) {
  screenerJob.start();
}

const crawlWatchlists = async () => {
  const lists = await watchListProvider.getWatchlists();
  for (const list of lists) {
    const initialList = Object.create(list);
    const symbols = await crawler.getSymbols(list.url);
    for (const symbol of symbols) {
      if (!list.symbols.includes(symbol)) {
        list.symbols.push(symbol);
      }
    }
    if (list !== initialList) {
      await watchListProvider.updateWatchlist(list);
    }
  }
}