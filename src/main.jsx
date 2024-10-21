import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';

import { Provider } from 'react-redux';
import store from './components/store/store.js';
import axios from 'axios';

const server = false;
// const url = 'http://192.168.1.155:3000/';
// const url = 'http://192.168.20.38:3000/';
const url = 'https://crmapi-production-9241.up.railway.app';

axios.defaults.baseURL = !server ? url : 'server';
createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <StrictMode>
    <App />
  </StrictMode>
 </Provider>,
)
