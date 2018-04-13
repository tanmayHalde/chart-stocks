import { error, success, warning } from 'toastr';
import * as event from '../../src/actions/eventTypes';
import * as status from '../../src/actions/statusTypes';
import * as actions from '../../src/actions/stockActions';

export default function addSocketMiddleware(socket, criteria = [],
  { execute = defaultExecute } = {}) {  
  const emitBound = socket.emit.bind(socket);
  
  return ({ dispatch }) => {
    // Receiving events
    socket.on(event.STOCK_ADDED_EVENT, data => {
      dispatch(actions.addStockSuccess(data));
      success(status.ADD_STOCK_SUCCESS_STATUS);
    });

    socket.on(event.STOCK_REMOVED_EVENT, data => {
      dispatch(actions.removeStockSuccess(data));
      warning(status.STOCK_REMOVE_SUCCESS_STATUS);
    });

    socket.on(event.CLIENT_CONNECTED_EVENT, () => {
      success(status.CLIENT_CONNECTED_STATUS);
    });

    socket.on(event.STOCKS_LOADED_EVENT, data => {
      dispatch(actions.loadStockSuccess(data));
      success(status.STOCKS_LOADED_STATUS);
    });

    socket.on(event.STOCKS_LOAD_EMPTY_EVENT, data => {
      warning(status.STOCKS_LOAD_EMPTY_STATUS);
    });

    socket.on(event.STOCK_ADD_FAILED_EVENT, () => {
      error(status.ADD_STOCK_FAILED_STATUS);
    });

    socket.on(event.STOCK_FETCH_FAILED_EVENT, data => {
      error(status.FETCH_STOCK_FAILED_STATUS);
    });

    socket.on(event.STOCK_REMOVE_FAILED_EVENT, data => {
      error(status.STOCK_REMOVE_FAILED_STATUS);
    });

    // Sending events
    return next => (action) => {
      if (evaluate(action, criteria)) {
        return execute(action, emitBound, next, dispatch);
      }
      return next(action);
    };
  };

  function evaluate(action, option) {
    if (!action || !action.type) {
      return false;
    }

    const { type } = action;
    let matched = false;
    if (typeof option === 'function') {
      // Test function
      matched = option(type, action);
    } else if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } else if (Array.isArray(option)) {
      // Array of types
      matched = option.some(item => type.indexOf(item) === 0);
    }
    return matched;
  }
}

function defaultExecute(action, emit, next, dispatch) { // eslint-disable-line no-unused-vars
  emit(action.type, action.data);
  return next(action);
}
