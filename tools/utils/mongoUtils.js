import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import { STOCK_ADD_FAILED_EVENT } from '../../src/actions/eventTypes';

export function addDocs(Stock, stock) {
  return new Promise((resolve, reject) => {
    let stockItem = new Stock({dataset: stock.dataset});
    stockItem.save((err, res) => {
      if (err) {
        console.log('Error saving data to db: '.red);
        reject(STOCK_ADD_FAILED_EVENT);
      } else {
        console.log(`New stock added to server: ${stock.dataset.dataset_code}`.bold.green);
        resolve();
      }
    });
  });
}

export function load(Stock) {
  return new Promise((resolve, reject) => {
    Stock.find({}, (err, docs) => {
      if (err) {
        console.log('Failed to load stocks '.red);
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

export function removeDocs(Stock, stockCode) {
  return new Promise((resolve, reject) => {
    Stock.remove({
      'dataset.dataset_code': stockCode
    }, (err, docs) => {
      if (err) {
        console.log(`Failed to remove stock: ${stockCode}`.red);
        reject(err);
      } else {
        console.log(`Stock removed: ${stockCode}`.bold.red);
        resolve();
      }
    });
  });
}

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