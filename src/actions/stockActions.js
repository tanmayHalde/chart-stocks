import * as types from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';

export function addStockSuccess(stock) {
  return {type: types.ADD_STOCK_SUCCESS, stock};
}

export function removeStockSuccess(stockCode) {
  return {type: types.REMOVE_STOCK_SUCCESS, stockCode};
}

export function loadStocks() {
  return dispatch => {
    return axios.get('/stocks')
      .then(res => {
        res.data.map(stock => {
          dispatch(addStock(stock.stockName));
        });
      })
      .catch(error => {
        toastr['warning'](' ', 'Error loading data from server!');
        throw(error); 
      });
  };
}

export function addStock(stockCode, socket = null) {
  stockCode = stockCode.toUpperCase();

  return dispatch => {
    let url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?
      api_key=${process.env.API_KEY}`;

    return axios.get(url)
      .then(res => {
        console.log('Stock data found for : ', res.data);
        if (socket) {
          socket.emit('addStock', stockCode);
        }
        dispatch(addStockSuccess(res.data));
      })
      .catch(error => {
        toastr.warning('Stock code not found');
        throw(error);
      });
  };
} 

export function removeStock(stockCode, socket) {
  stockCode = stockCode.toUpperCase();

  return dispatch => {
    socket.emit('removeStock', stockCode);
    dispatch(removeStockSuccess(stockCode));
  };
}

