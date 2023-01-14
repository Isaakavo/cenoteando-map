import axios, { RawAxiosRequestHeaders } from 'axios';
import React from 'react';
import { ApiContext } from '../utils/ApiInstanceProviver';

//TODO implement interceptors
export const useApi = (
  url: string,
  method: string,
  payload: object,
  params?: any,
  headers?: RawAxiosRequestHeaders
) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const contextInstance = React.useContext(ApiContext);
  const instance = React.useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance])
  const controllerRef = React.useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetch = async (payload?: object) => {
    try {
      setLoading(true);
      const response = await instance.request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url,
        params,
        headers
      });
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const postOperation = async (payload: object) => {
    fetch(payload);
  };

  React.useEffect(() => {
    if (method === 'get') {
      fetch();
    }
  }, []);

  return { cancel, data, error, loading, postOperation };
};
