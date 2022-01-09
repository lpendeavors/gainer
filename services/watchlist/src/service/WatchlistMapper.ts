import { IWatchlist } from '@gainer/models';
import { WatchlistDocument } from './WatchlistSchema';

export const toIWatchlist = (doc: WatchlistDocument | null) => {
  return <IWatchlist>{
    id: doc?._id,
    userId: doc?.userId,
    symbols: doc?.symbols,
    name: doc?.name,
    url: doc?.url
  }
}