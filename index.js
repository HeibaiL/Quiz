import React from "react";
import ReactDOM from "react-dom";

import { App } from "./client/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./client/store/reducers";

import "./index.less";
const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
