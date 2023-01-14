import React from 'react';
import { useApi } from '../hooks/useApi';

export const SingUp: React.FC = () => {
  const [name, setName] = React.useState('isaak');
  const [email, setEmail] = React.useState('isaak@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const { data, error, postOperation } = useApi('/api/auth/register', 'post', {
    name,
    email,
    password,
  });

  const onSubmit = () => {
    console.log('Submiting the values', { name, email, password });
    postOperation({ name, email, password });
    console.log('Response from the service');
    
  };
  console.log({ data, error });
  return (
    <div>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type='button' value='Sign!' onClick={onSubmit} />
    </div>
  );
};
