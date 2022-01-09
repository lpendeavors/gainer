import mongoose from "mongoose";
import bluebird from "bluebird";
import { IWatchlist } from "@gainer/models";
import Watchlist, { WatchlistDocument } from "./WatchlistSchema";

mongoose.Promise = bluebird.Promise;

export const getWatchlists = async (): Promise<WatchlistDocument[]> => {
  return await Watchlist.find();
}

export const getWatchlist = async (id: string): Promise<WatchlistDocument | null> => {
  return await Watchlist.findById(id);
}

export const createWatchlist = async (watchlist: IWatchlist): Promise<WatchlistDocument> => {
  return await new Watchlist(watchlist).save();
}

export const updateWatchlist = async (watchlist: IWatchlist): Promise<WatchlistDocument | null> => {
  return await Watchlist.findByIdAndUpdate(watchlist.id, watchlist);
}

export const deleteWatchlist = async (id: string): Promise<WatchlistDocument | null> => {
  return await Watchlist.findByIdAndDelete(id);
}