import { StockHistoricalPriceResult, CompanyRatingResult } from "@leadofftech/fmp-client/dist/lib/models";
import { IStockHistory, IStockRating } from "@leadofftech/gainer-models";

export const toIStockHistory = (result: StockHistoricalPriceResult | null)  => {
  return result?.historical?.map(h => {
    return <IStockHistory>{
      date: new Date(h.date),
      open: h.open,
      high: h.high,
      low: h.low,
      close: h.close,
      volume: h.volume,
      change: h.change,
      changePercent: h.changePercent,
      label: h.label
    };
  }) ?? [];
}

export const toIStockRating = (result: CompanyRatingResult[] | null) => {
  return result?.map(r => {
    return <IStockRating>{
      date: r.date,
      rating: r.rating,
      ratingScore: r.ratingScore,
      ratingRecommendation: r.ratingRecommendation
    }
  });
}