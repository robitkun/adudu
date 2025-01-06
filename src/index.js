import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/public-api.js';
import { handleMulterError } from './response/multerError.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.listen(PORT, () => {
  console.log('Server Berjalan');
});
app.use(handleMulterError);
