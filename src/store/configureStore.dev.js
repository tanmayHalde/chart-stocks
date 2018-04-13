import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import io from 'socket.io-client';
import addSocketMiddleware from './socketMiddleware';
const url = process.env.NODE_ENV === 'production' ?
  `https://th-chartstock.herokuapp.com` : 
  `http://localhost:${process.env.PORT}`;
  
const socket = io(url);
let socketMiddleware = addSocketMiddleware(socket, "server/");

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware, reduxImmutableStateInvariant())
  );

  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
