import mongoose from 'mongoose';

export default function dbStart() {
  let db = mongoose.connect('mongodb://localhost/fcc');

  db.on('error', err => {
    console.log('FAILED to connect to mongoose');
    console.error(err);
  });

  db.on('connected', () => {
    console.log('connected to mongoose');
  });
}