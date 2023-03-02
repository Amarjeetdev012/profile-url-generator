import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDatabase = () => {
  console.log('mongodb is connecting ....');
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('mongodb is connected');
    })
    .catch((err) => {
      console.log('Error', err);
    });
};
