import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from './utils/setAuthToken';
import { setCurrentUser } from './action';

import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const reduxDevtool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const storeWithMiddleware = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    reduxDevtool
  )
);

//check for token
const headerToken = localStorage.getItem('jwtToken');
if (headerToken) {
  //Set auth token header
  setAuthToken(headerToken);
  //Decode TOKEN and get user's info
  const decoded = jwtDecode(headerToken);
  //Set user and isAuthenticated
  storeWithMiddleware.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={storeWithMiddleware}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
