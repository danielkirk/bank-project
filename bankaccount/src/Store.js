import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import BankReducer from "./components/redux/BankReducer";

const Store = createStore(
  combineReducers({ BankReducer }),
  compose(applyMiddleware(createLogger(), thunk, promise()))
);

export default Store;
