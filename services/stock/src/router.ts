import { Router } from 'express';
import { StockController } from './service/StockController';
const router = Router();

router.use('/stock', StockController);

export default router;