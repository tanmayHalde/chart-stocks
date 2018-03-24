import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function stockReducer(state = initialState.stocks, action) {
  switch (action.type) {
    case types.ADD_STOCK_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.stock)
      ];
    case types.REMOVE_STOCK_SUCCESS:
      return [
        ...state.filter(stock => {
          return stock.dataset.dataset_code === action.stock.dataset.dataset_code;
        })
      ];
    default:
      return state;
  }
}
