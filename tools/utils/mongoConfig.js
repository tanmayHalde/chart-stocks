import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();

export function start() {
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSCODE}` +
	`@ds231229.mlab.com:31229/th-freecodecamp`);

  let db = mongoose.connection;
  db.on('error', err => {
    console.log('Connection to mLab failed'.bold.red);
    console.error(err);
  });

  db.on('connected', () => {
    console.log('Connected to mLab'.green);
  });
}
