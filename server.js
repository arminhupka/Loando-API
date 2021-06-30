import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './db/mongo.js';

// Routes
import userRoutes from './routes/userRoutes.js';

// Init
dotenv.config();
const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.use('/user', userRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.underline.bold.blue);
  connectDB();
});
