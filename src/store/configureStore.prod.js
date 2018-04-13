import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import io from 'socket.io-client';
import addSocketMiddleware from './socketMiddleware';
const url = process.env.NODE_ENV === 'production' ?
  `https://th-chartstock.herokuapp.com` : 
  `http://localhost:${process.env.PORT}`;
  
const socket = io(url);
let socketMiddleware = addSocketMiddleware(socket, "server/");

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, socketMiddleware)
  );
}
