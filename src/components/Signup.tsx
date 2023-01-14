import React from 'react';
import { useApi } from '../hooks/useApi';

export const SingUp: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { data, error, postOperation } = useApi('/api/auth/register', 'post', {
    name,
    email,
    password,
  });

  const onSubmit = () => {
    console.log('Submiting the values', { name, email, password });
    postOperation({ name, email, password });
    console.log('Response from the service');
    console.log({ data, error });
  };

  return (
    <div>
      <input
        type='text'
        placeholder='name'
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type='button' value='Sign!' onClick={onSubmit} />
    </div>
  );
};
