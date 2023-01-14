import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    post: { 'content-Type': 'application/json' },
  },
});

export const httpClientConfig = {
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    post: {
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
};
