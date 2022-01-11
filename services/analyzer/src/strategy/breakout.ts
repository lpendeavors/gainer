import { IStockHistory } from "@leadofftech/gainer-models";

export const isBreakingOutAfterConsolidation = (history: IStockHistory[]): boolean => {
  if (history.length) {
    const lastClose = history[0].close;
    if (isConsolidating(history)) {
      const recentCloses = history.slice(1, 8).map(h => h.close);
      if (lastClose > Math.max(...recentCloses)) {
        return true;
      }
    }
  }
  return false;
}

const isConsolidating = (history: IStockHistory[]): boolean => {
  const lastTwoWeeks = history.slice(0, 14);
  const minClose = Math.min(...lastTwoWeeks.map(h => h.close));
  const maxClose = Math.max(...lastTwoWeeks.map(h => h.close));
  const threshold = 1 - (20 / 100);
  if (minClose > (maxClose * threshold)) {
    return true;
  }
  return false;
}