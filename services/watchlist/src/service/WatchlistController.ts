import * as express from 'express';
import * as watchlistProvider from './WatchlistDataProvider';
import { toIWatchlist } from './WatchlistMapper';

export const WatchlistController = express.Router();

WatchlistController.get('/', async (req, res, next) => {
  const lists = await watchlistProvider.getWatchlists();
  return res.send(lists.map(toIWatchlist));
});

WatchlistController.get('/:id', async (req, res, next) => {
  const list = await watchlistProvider.getWatchlist(req.params.id);
  return res.send(toIWatchlist(list));
});

WatchlistController.post('/', async (req, res, next) => {
  const list = await watchlistProvider.createWatchlist(req.body);
  return res.send(toIWatchlist(list));
});

WatchlistController.put('/:id', async (req, res, next) => {
  await watchlistProvider.updateWatchlist(req.body);
  return res.status(200).send();
});

WatchlistController.delete('/:id', async (req, res, next) => {
  await watchlistProvider.deleteWatchlist(req.params.id);
  return res.status(200).send();
});