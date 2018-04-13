import * as types from './actionTypes';

export function addStockSuccess(stock) {
  return {type: types.ADD_STOCK_SUCCESS, stock};
}

export function removeStockSuccess(stockCode) {
  return {type: types.REMOVE_STOCK_SUCCESS, stockCode};
}

export function loadStockSuccess(stocks) {
  return {type: types.LOAD_STOCKS_SUCCESS, stocks};
}

export function loadStocks(socket) {
  return dispatch => {
    dispatch({type: types.LOAD_STOCK_SOCKET, data: ''});
  };
}

export function addStock(stockCode, socket = null) {
  stockCode = stockCode.toUpperCase();
  return dispatch => {
    dispatch({type: types.ADD_STOCK_SOCKET, data: stockCode});
  };
} 

export function removeStock(stockCode) {
  stockCode = stockCode.toUpperCase();
  return dispatch => {
    dispatch({type: types.REMOVE_STOCK_SOCKET, data: stockCode});
  };
}

