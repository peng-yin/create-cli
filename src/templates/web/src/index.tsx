import React from 'react';
import { createRoot } from 'react-dom/client';
import moment from 'moment';
import App from './App';

moment.locale('zh-cn');

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

if (module.hot) {
  module.hot.accept('./App', () => {
    root.render(
      // <React.StrictMode>
        <App />
      // </React.StrictMode>
    );
  });
}
