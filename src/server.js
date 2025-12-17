import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import usersRoutes from './routes/usersRoutes.js';
import businessesRoutes from './routes/businessesRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 🔗 ROUTES
app.use(usersRoutes);
app.use(businessesRoutes);
app.use(bookingsRoutes);

// start server ONLY after DB connection
async function startServer() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();

