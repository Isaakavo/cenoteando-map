import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import React from 'react';

export const ApiContext = React.createContext<AxiosInstance | null>(null);

interface ApiContextProviderProps {
  config: object;
  requestInterceptors?: [
    (config: AxiosRequestConfig) => AxiosRequestConfig<any>
  ];
  responseInterceptors?: [];
  children: React.ReactNode;
}

export const ApiInstanceProvider: React.FC<ApiContextProviderProps> = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}) => {
  const instanceRef = React.useRef(axios.create(config));

  React.useEffect(() => {
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(interceptor);
    });

    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(interceptor);
    });
  }, []);

  return (
    <ApiContext.Provider value={instanceRef.current}>
      {children}
    </ApiContext.Provider>
  );
};
