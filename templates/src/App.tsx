import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from '@/component/error-boundary';
import Entry from './router';
import store from './store';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <ErrorBoundary>
          <Entry />
        </ErrorBoundary>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
)

export default App;
