import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

// reducer imports
import userReducer from './reducers/userReducer';
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import testReducer from "./reducers/testReducer";

import thunk from 'redux-thunk';

const middleware = [thunk]

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
  test: testReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

console.log(store.getState());

export default store;

