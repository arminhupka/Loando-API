import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './db/mongo.js';

// Middleware
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';

// Init
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Loando API'));
app.use('/user', userRoutes);
app.use('/loan', loanRoutes);

app.use(notFound);
app.use(errorHandler);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.underline.bold.blue);
  connectDB();
});
