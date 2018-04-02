export default function handleSocketEventsAndUpdateSchema(io, Stock) {
	io.on('connect', function(socket) {
		console.log('New client connected, id:' + socket.id);
		socket.emit('connectionSuccess', 'Connected to server');
		
		socket.on('addStock', function(stockCode) {
			let stockItem = new Stock({
				stockName: stockCode
			});
			stockItem.save((err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(`Stock added: ${stockCode}`);
				}
			});
			socket.broadcast.emit('stockAdded', stockCode);
		});
	
		socket.on('removeStock', function(stockCode) {
			Stock.remove({stockName: stockCode }, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(`Stock removed: ${stockCode}`);
				}
			});
			socket.broadcast.emit('stockRemoved', stockCode);
		});
	
		socket.on('disconnect', function() {
			console.log('Client disconnected');
		});
	});
}