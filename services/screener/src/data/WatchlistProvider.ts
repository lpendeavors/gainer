import { IWatchlist } from "@gainer/models";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `${process.env.WATCHLIST_SERVICE_URL}`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const getWatchlists = async (): Promise<IWatchlist[]> => {
  return await instance.get('watchlist').then(responseBody);
}

export const updateWatchlist = async (watchlist: IWatchlist): Promise<void> => {
  await instance.put(`watchlist/${watchlist._id}`, watchlist);
}