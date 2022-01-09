import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 1235;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
