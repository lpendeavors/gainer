import { Router } from 'express';
import { WatchlistController } from './service/WatchlistController';
const router = Router();

router.use('/watchlist', WatchlistController);

export default router;