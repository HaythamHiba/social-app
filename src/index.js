import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import { createStore ,applyMiddleware,compose,combineReducers} from "redux";
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import auth from './store/reducers/auth';
import search from './store/reducers/search';
import mainAccount from './store/reducers/mainAccount';
import feeds from './store/reducers/feeds';
import post from './store/reducers/post';
import comment from './store/reducers/comment'
import newPost from './store/reducers/newPost';
import friends from './store/reducers/friends';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
  const engine = new Styletron();
  const rootReducer=combineReducers({
    auth:auth,
    search:search,
    newPost:newPost,
    feeds:feeds,
    post:post,
    friends:friends,
    comment:comment,
    mainAccount:mainAccount,
  })
  const store = createStore(
    rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  );
ReactDOM.render(
  <Provider store={store}>
       <BrowserRouter >
     <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <App />
    </StyletronProvider>
    </BrowserRouter>
  </Provider>
 
, document.getElementById('root'));
