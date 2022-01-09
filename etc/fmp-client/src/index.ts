import auth from './lib/auth';
import financial from './lib/financial';
import stock from './lib/stock';

import * as dotenv from 'dotenv';
dotenv.config();

auth.key = `${process.env.FMP_API_KEY}`;

export * from './lib/models';

export default {
  auth,
  financial,
  stock
}