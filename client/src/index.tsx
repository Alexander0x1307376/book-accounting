import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createGlobalStyle } from 'styled-components';

// убираем ненужные свойства у одного из стилей ant-design
const PopoverFix = createGlobalStyle`
   .ant-popover-inner-content {
    padding: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <PopoverFix />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
