import axios from 'axios';
import * as types from './actionTypes';
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
        toastr.warning('Error loading stocks from server!');
      });
  };
}

export function addStock(stockCode, socket = null) {
  stockCode = stockCode.toUpperCase();

  return dispatch => {
    let url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?` +
      `order=asc&api_key=${process.env.API_KEY}`;

    return axios.get(url)
      .then(res => {
        if (socket) {
          socket.emit('addStock', stockCode);
        }
        dispatch(addStockSuccess(res.data));
      })
      .catch(error => {
        throw(error);
      });
  };
} 

export function removeStock(stockCode, socket = null) {
  stockCode = stockCode.toUpperCase();

  return dispatch => {
    if (socket) {
      socket.emit('removeStock', stockCode);
    }
    dispatch(removeStockSuccess(stockCode));
  };
}

