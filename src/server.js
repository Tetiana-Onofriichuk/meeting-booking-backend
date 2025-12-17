import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import usersRoutes from './routes/usersRoutes.js';
import businessesRoutes from './routes/businessesRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(usersRoutes);
app.use(businessesRoutes);
app.use(bookingsRoutes);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

async function startServer() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();

