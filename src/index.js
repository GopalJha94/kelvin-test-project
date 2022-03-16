import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/Home';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


axios.interceptors.request.use( request => {
  //if you want to pass any headers or something with every request you can do here
  return request
})

axios.interceptors.response.use( response => {
  //want to use something with every reponse you can add with key value pair
  return response
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
