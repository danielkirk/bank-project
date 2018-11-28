import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import AppReducer from "./components/redux/AppReducer";

const Store = createStore(
  combineReducers({ AppReducer }),
  compose(applyMiddleware(createLogger(), thunk, promise()))
);

export default Store;
