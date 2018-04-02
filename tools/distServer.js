import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import Stock from './utils/mongoose/Stock';

/*----Utilities----*/
import * as mongo from './utils/mongoConfig';
import handleSocketEventsAndUpdateSchema from './utils/socketEventHandler';
import handleHttpRequestsAndUpdateSchema from './utils/httpRequestHandler';

/* eslint-disable no-console */
let port = process.env.PORT || 3000;
const app = express();

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static('dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

/*----DB setup----*/
mongo.start();

/*----HTTP Requests----*/
handleHttpRequestsAndUpdateSchema(app, Stock);

/*----Socket Events----*/
let server = http.createServer(app);
let io = require('socket.io')(server);
handleSocketEventsAndUpdateSchema(io, Stock);

server.listen(port, function(err) {
  if (err) {
    console.log(err);
	} else {
		console.log(`Listening on port ${port}...`);
	}
});