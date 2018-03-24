// import Express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server'
// import App from '../components/App';
// import { searchQuandlDatasets, getQuandlDatasetData } from './quandl';
// import SocketIO from 'socket.io';

// let app = new Express ();

// app.set ('view engine', 'ejs');
// app.set ('views', path.join (__dirname, 'views'));
// app.use (Express.static ('dist'));
// app.use (bodyParser.json ());
// app.use (bodyParser.urlencoded ({ extended: true }));

// app.get ('/', (req, res) => {
//   let reactHtml = ReactDOMServer.renderToString (<App />);

//   res.render ('index', {
//     reactOutput: reactHtml
//   });
// });

// app.post ('/search-stock', (req, res) => {
//   res.writeHead (200, {'Content-Type': 'application/json'});

//   if (propError())
//     return res.end(JSON.stringify({error: 'Invalid request. `query` missing.' }));

//   let query = req.body.query.split ('').filter (val => /[A-Za-z]/.test (val)).join ('');

//   if ( query.length < 1 )
//     return res.end(JSON.stringify ({
//       error: false,
//       stockList: [],
//       requestTime: new Date ().getTime (),
//       query: query
//     }));

//   const quandlCallback = (page) => {
//     if ( page.hasOwnProperty ('quandl_error') ) {
//       let error = '/search-stock, Quandl Error: ' + page.quandl_error.message;

//       console.warn (error);
//       return res.end (JSON.stringify ({ error: error }));
//     }

//     return res.end (JSON.stringify ({
//       error: false,
//       stockList: page.datasets,
//       requestTime: new Date ().getTime (),
//       query: query
//     }));
//   };

//   searchQuandlDatasets (1, query, quandlCallback);
// });

// app.post ('/get-stock', (req, res) => {
//   res.writeHead (200, { 'Content-Type': 'application/json' });

//   if ( !req.body.hasOwnProperty ('query') )
//     return res.end (JSON.stringify ({ error: 'Invalid request. `query` missing.' }));

//   let query = req.body.query.split ('').filter (val => /[A-Za-z]/.test (val)).join ('');

//   if ( query.length < 1 )
//     return res.end (JSON.stringify ({ error: 'Stock not found' }));

//   const quandlCallback = (page) => {
//     if ( page.hasOwnProperty ('quandl_error') ) {
//       let error = '/get-stock, Quandl Error: ' + page.quandl_error.message;

//       console.warn (error);
//       return res.end (JSON.stringify ({ error: error }));
//     }

//     return res.end (JSON.stringify ({
//       error: false,
//       stockData: page.dataset
//     }));
//   };

//   getQuandlDatasetData (query, quandlCallback);
// });


// function quandlError() {
//   return null;
// } 

// function propError(req, res) {
//   return !req.body.hasOwnProperty('query');
// }

// let io = SocketIO (app.listen (process.env.PORT || 3000));

// io.on ('connection', socket => {
//   socket.on ('add_stock', data => socket.broadcast.emit ('new_stock', data));
//   socket.on ('rm_stock', data => socket.broadcast.emit ('rm_stock', data));
// });