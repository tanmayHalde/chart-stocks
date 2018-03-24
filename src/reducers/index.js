import { combineReducers } from 'redux';
import stocks from './stockReducer';
import initialState from './initialState';

const rootReducer = combineReducers({
  stocks,
  initialState
});

export default rootReducer;