import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    post: { 'content-Type': 'application/json' },
  },
});
