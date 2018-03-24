import http from 'http';
import path from 'path';
import open from 'open';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import webpack from 'webpack';

import config from '../webpack.config.dev';
import Stock from './utils/mongoose/Stock';
// import handleSocketEventHandler from './utils/socketEventHandler';
// import handleHttpRequests from './utils/httpRequestHandler';

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

/*----DB setup----*/
mongoose.connect('mongodb://localhost/fcc');
mongoose.connection.on('error', err => {
	console.log('FAILED to connect to mongoose');
	console.error(err);
});
mongoose.connection.on('connected', () => {
	console.log('connected to mongoose');
});

/*----Req handling----*/
// handleHttpRequests(app);
app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});
app.get('/stocks', function(req, res) {
	Stock.find({}, (err, polls, next) => {
		if (err) return next(err);
		console.log('LOADING STOCKS: ', polls);
		return res.status(200).json(polls);
	});
});

//--------SOCKET
// <insert some helper method here>
let server = http.createServer(app);
let io = require('socket.io')(server);
server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

io.on('connect', function(socket) {
	console.log('New client connected, id: ', socket.id);
	
	socket.on('addStock', function(stockCode) {
		let stockItem = new Stock({
			stockName: stockCode.toUpperCase()
		});
		stockItem.save((err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Added new stock ${stockCode.toUpperCase()}!`);
			}
		});
		socket.broadcast.emit('stockAdded', 'stockItem');
	});

	socket.on('removeStock', function(stockCode) {
		Stock.remove({stockName: stockCode }, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Removed stock ${stockCode}`);
			}
		});
		socket.broadcast.emit('stockRemoved', 'stockItem');
	});

	socket.on('disconnect', function() {
		console.log('Client disconnected');
	});
});