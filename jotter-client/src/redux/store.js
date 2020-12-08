import {createStore, combineReducers} from 'redux';

// reducer imports
import userReducer from './reducers/userReducer';
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import testReducer from "./reducers/testReducer";

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
  test: testReducer
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());

export default store;

