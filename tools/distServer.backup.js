import http from 'http';
import path from 'path';
import open from 'open';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Stock from './utils/mongoose/Stock';

/* eslint-disable no-console */
const port = 3000;
const app = express();

app.use(compression());
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

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
app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});
app.get('/stocks', function(req, res) {
	Stock.find({}, (err, polls, next) => {
		if (err) return next(err);
		console.log('Loading stocks... ', polls);
		return res.status(200).json(polls);
	});
});

//--------SOCKET
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