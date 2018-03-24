import Stock from './mongoose/Stock';

function handleSocketEvents(io) {
	io.on('connection', function(socket) {
		console.log('New client connected with id:' + socket.id);
		
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
}

export default handleSocketEvents;