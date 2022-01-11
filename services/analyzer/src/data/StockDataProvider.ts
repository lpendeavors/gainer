import { IStockHistory, IStockRating } from "@leadofftech/gainer-models";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `http://localhost:1235`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const getStockHistory = async (symbol: string): Promise<IStockHistory[]> => {
  return await instance.get(`stock/${symbol}/history`, {
    params: { limit: 60 }
  }).then(responseBody);
}

export const getStockRating = async (symbol: string): Promise<IStockRating[]> => {
  return await instance.get(`stock/${symbol}/rating`).then(responseBody);
}
