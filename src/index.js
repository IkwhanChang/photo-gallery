import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from "redux-promise-middleware";
import App from './App';
import reducers from "./modules";

const composeEnhancers =
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const customizedPromiseMiddleware = promiseMiddleware({
  promiseTypeSuffixes: ["LOADING", "SUCCESS", "FAILURE"]
});

const store = createStore(
  reducers,
  {},
  composeEnhancers(
    applyMiddleware(
      loadingBarMiddleware({
        promiseTypeSuffixes: ["PENDING", "SUCCESS", "FAILURE"]
      }),
      ReduxThunk,
      /*logger, */ customizedPromiseMiddleware
    )
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
