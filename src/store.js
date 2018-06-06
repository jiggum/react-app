import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const middleWares = [thunk];
const composeEnhancers =
  process.env.REACT_APP_ENV === 'production'
    ? compose
    // eslint-disable-next-line no-underscore-dangle
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = null;

export default (initialStore = {}) => {
  const combindedReducer = combineReducers({

  });
  store = createStore(
    combindedReducer,
    initialStore,
    composeEnhancers(applyMiddleware(...middleWares)),
  );
  return store;
};
