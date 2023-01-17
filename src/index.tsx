import { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { httpClientConfig } from './services/HttpClient';
import { ApiInstanceProvider } from './utils/ApiInstanceProviver';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Login } from './components/Login';
import { SingUp } from './components/Signup';

//TODO investigate about CORS
//There is a bug that makes a first request without jwt token,
//we must investigate why
const requestInterceptor = (config: AxiosRequestConfig) => {
  const authHeader = config?.headers?.['Authorization'];
  if (!authHeader) {
    debugger;
    const accessToken = window.sessionStorage.getItem('userSession');
    const tokenType = 'Bearer';

    if (accessToken && tokenType) {
      if (config.headers !== null && config.headers !== undefined) {
        debugger;
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
    <Router>
      <ApiInstanceProvider
        config={httpClientConfig}
        requestInterceptors={[requestInterceptor]}
      >
        <NavBar />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/signup' element={<SingUp />} />
          <Route path='/login' element={<Login />} /> 
        </Routes>
      </ApiInstanceProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
