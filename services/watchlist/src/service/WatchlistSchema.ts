import mongoose from 'mongoose';
import { IWatchlist } from '@gainer/models';

export type WatchlistDocument = mongoose.Document & IWatchlist;

const WatchlistSchema = new mongoose.Schema<WatchlistDocument>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  symbols: [{
    type: String,
  }]
}, { timestamps: true });

export default mongoose.model<WatchlistDocument>('Watchlist', WatchlistSchema);