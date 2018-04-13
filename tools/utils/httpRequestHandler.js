import path from 'path';

export default function handleHttpRequestsAndUpdateSchema(app, Stock) {
  app.get('/', function(req, res) {
    res.header('Cache-Control', 'no-cache, no-store');
    res.header('Pragma', 'no-cache');
    const indexPath = process.env.NODE_ENV === 'production' ?
      '../dist/index.html' : '../../src/index.html';

    res.sendFile(path.join( __dirname, indexPath));
  });
}