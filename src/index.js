import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import LayoutWrapper from './Layout/LayoutWrapper';
// import store from './store'
import store from "./store"
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <LayoutWrapper />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
