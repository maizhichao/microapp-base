import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { mainReducer } from "./reducers/main";

export const rootReducer = combineReducers({
  main: mainReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
