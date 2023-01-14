import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { httpClientConfig } from './services/HttpClient';
import { ApiInstanceProvider } from './utils/ApiInstanceProviver';

//TODO investigate about CORS
//There is a bug that makes a first request without jwt token,
//we must investigate why
const requestInterceptor = (config: AxiosRequestConfig) => {
  const authHeader = config?.headers?.['Authorization'];
  if (!authHeader) {
    const accessToken = window.sessionStorage.getItem('userSession');
    const tokenType = 'Bearer';

    if (accessToken && tokenType) {
      if (config.headers !== null && config.headers !== undefined) {
        config.headers['Authorization'] = tokenType + ' ' + accessToken;
      }
    }
  }
  return config;
};

const responseInterceptor = (response: AxiosResponse<any>) => {
  if (response.data.notification) {
    // if (response.data.notification.errorMessages.length)
    //     Store.dispatch(
    //         'notification',
    //         response.data.notification.errorMessages,
    //     );
    response.data = response.data.response;
  }
  return response;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiInstanceProvider
      config={httpClientConfig}
      requestInterceptors={[requestInterceptor]}
    >
      <App />
    </ApiInstanceProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
