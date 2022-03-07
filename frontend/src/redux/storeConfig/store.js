import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { IntialState } from "./IntialState";
import { rootReducer } from "./rootReducers";

export const store = createStore(
  rootReducer,
  IntialState,
  applyMiddleware(thunk)
);
