import React from 'react';
import CenoteDTO from '../models/CenoteDTO';
import { httpClient } from '../services/HttpClient';

type HttpMethod = 'get' | 'delete' | 'post' | 'put';

interface UseApiI {
  url: string;
  method: HttpMethod;
  body?: string | null;
  headers?: string | null;
  params?: any;
}

export const useApi = ({
  url,
  method,
  body = null,
  headers = null,
  params,
}: UseApiI): [CenoteDTO[] | null, string, boolean] => {
  const [response, setResponse] = React.useState<CenoteDTO[] | null>(null);
  const [error, setError] = React.useState('');
  const [loading, setloading] = React.useState(true);

  const fetchData = () => {
    httpClient[method](url, {
      header: headers ? JSON.parse(headers) : undefined,
      params,
    })
      .then((res) => {
        setResponse(res.data.content.map((c: CenoteDTO) => new CenoteDTO(c)));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
    debugger;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return [response, error, loading];
};
