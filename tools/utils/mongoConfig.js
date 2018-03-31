import mongoose from 'mongoose';

export function start() {
  mongoose.connect('mongodb://localhost/fcc');

  mongoose.connection.on('error', err => {
    console.log('FAILED to connect to mongoose');
    console.error(err);
  });

  mongoose.connection.on('connected', () => {
    console.log('connected to mongoose');
  });
}