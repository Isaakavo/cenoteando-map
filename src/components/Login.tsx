import React from 'react';
import { useApi } from '../hooks/useApi';

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { data, error, postOperation } = useApi('/api/auth/login', 'post', {
    email,
    password,
  });

  const onSubmit = () => {
    console.log('Submiting the values', { email, password });
    postOperation({ email, password });
  };
  console.log('Response from the service');
  console.log({ data, error });
  return (
    <div>
      <input type='text' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <input type='button' value='Sign!' onClick={onSubmit} />
    </div>
  );
};
