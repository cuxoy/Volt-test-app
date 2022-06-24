import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import products from "../reducers/products";
import customers from "../reducers/customers";
import invoces from "../reducers/invoces";

const store = createStore(
  combineReducers({ products, customers, invoces }),
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
