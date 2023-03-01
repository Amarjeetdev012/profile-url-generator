import mongoose from 'mongoose';

export const connectDatabase = () => {
  console.log('mongodb is connecting ....');
  mongoose
    .connect(
      'mongodb+srv://amarjeet:8ckRS2Equ0wiGgKx@cluster0.9lvsazp.mongodb.net/link'
    )
    .then(() => {
      console.log('mongodb is connected');
    })
    .catch((err) => {
      console.log('Error', err);
    });
};
