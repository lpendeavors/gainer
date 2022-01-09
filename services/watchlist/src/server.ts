import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 1234;

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}?authSource=admin&replicaSet=db-gainer&tls=true&tlsCAFile=${process.env.DB_CERT_LOCATION}`)
.then((_) => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
})
.catch((error) => console.error(error));

