import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';  // looks for rootReducer obj exported from one of the files in /reducers
import thunk from 'redux-thunk';

export default function configureStore(initialState) {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
