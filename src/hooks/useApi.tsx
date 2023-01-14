import React from 'react';
import { httpClient } from '../services/HttpClient';

export const useApi = (url: string, method: string, payload: object, params?: any) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const controllerRef = React.useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetch = async () => {
    try {
      setLoading(true);
      const response = await httpClient.request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url,
        params
      });
      setData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetch()
  }, []);

  return {cancel, data, error, loading};
};
