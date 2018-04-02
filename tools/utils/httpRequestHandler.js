import path from 'path';

export default function handleHttpRequestsAndUpdateSchema(app, Stock) {
  app.get('/', function(req, res) {
    if(process.env.NODE_ENV === 'production' ) {
      res.sendFile(path.join( __dirname, '../dist/index.html'));
    } else {
      res.sendFile(path.join( __dirname, '../../src/index.html'));
    }
  });

  app.get('/stocks', function(req, res) {
    Stock.find({}, (err, polls, next) => {
      if (err) return next(err);
      console.log('Loading stocks ', polls);
      return res.status(200).json(polls);
    });
  });
}