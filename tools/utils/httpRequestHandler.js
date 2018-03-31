import Stock from './mongoose/Stock';
import path from 'path';

export default function handleHttpRequests(app) {
  app.get('/', function(req, res) {
    res.sendFile(path.join( __dirname, '../../src/index.html'));
  });
  
  app.get('/stocks', function(req, res) {
    Stock.find({}, (err, polls, next) => {
      if (err) return next(err);
      return res.status(200).json(polls);
    });
  });
}