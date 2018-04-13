import axios from 'axios';
import * as mongo from './mongoUtils';
import * as event from '../../src/actions/eventTypes';
import * as action from '../../src/actions/actionTypes';

export default function handleSocketEventsAndUpdateSchema(io, Stock) {
	io.on('connect', function(socket) {
		console.log('New client connected, id:'.bold.green, socket.id);
		socket.emit(event.CLIENT_CONNECTED_EVENT, 'Connected to server');
		
		socket.on(action.ADD_STOCK_SOCKET, function(stockCode) {
			const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?` +
      `order=asc&api_key=${process.env.API_KEY}`;

			axios.get(url)
				.then(res => {
					mongo.addDocs(Stock, res.data)
						.then(() => {
							socket.emit(event.STOCK_ADDED_EVENT, res.data);
							socket.broadcast.emit(event.STOCK_ADDED_EVENT, res.data);
						})
						.catch(err => {
							socket.emit(err, '');
						});
				})
				.catch(error => {
					socket.emit(event.STOCK_NOT_FOUND_EVENT, '');
				});
		});

		socket.on(action.LOAD_STOCK_SOCKET, function() {
			mongo.load(Stock)
				.then(stocks => {
					const eventName = stocks.length > 0 ? event.STOCKS_LOADED_EVENT : 
						event.STOCKS_LOAD_EMPTY_EVENT;
					socket.emit(eventName, stocks);
				})
				.catch(err => {
					const eventName = event.STOCKS_LOAD_FAILED_EVENT;
					socket.emit(eventName, '');
				});
		});
	
		socket.on(action.REMOVE_STOCK_SOCKET, function(stockCode) {
			mongo.removeDocs(Stock, stockCode)
				.then(() => {
					socket.emit(event.STOCK_REMOVED_EVENT, stockCode);
					socket.broadcast.emit(event.STOCK_REMOVED_EVENT, stockCode);
				})
				.catch(err => {
					socket.emit(event.STOCK_REMOVE_FAILED_EVENT, stockCode);
				});
		});
	
		socket.on('disconnect', function() {
			console.log('Client disconnected');
		});
	});
}