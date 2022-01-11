import { IWatchlist } from "@leadofftech/gainer-models";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `http://localhost:1234`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const getWatchlists = async (): Promise<IWatchlist[]> => {
  return await instance.get('watchlist').then(responseBody);
}