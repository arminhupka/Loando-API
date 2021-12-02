import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MONGODB CONNECTED: ${connection.connection.host}`.underline.bold.green);
  } catch (err) {
    console.log(`MONGODB ERROR: ${err.message}`.underline.bold.red);
  }
};

export default connectDB;
