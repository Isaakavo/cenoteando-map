import React from 'react';
import { useApi } from '../hooks/useApi';
import AuthDto from '../models/AuthDTO';

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('isaak@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const { data, error, postOperation } = useApi('/api/auth/login', 'post', {
    email,
    password,
  });

  // TODO improve how to store JWT token and ensure that the token gets a good response on every call
  const onSubmit = () => {
    console.log('Submiting the values', { email, password });
    window.sessionStorage.clear();
    postOperation({ email, password });
  };

  // Note: using session store while we decide that kind of store we are going to use for the app
  React.useEffect(() => {
    if (data !== null) {
      const user = new AuthDto(data);
      window.sessionStorage.setItem('userSession', user.accessToken);
    }
  }, [data]);

  console.log({data, error});
  

  return (
    <div>
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
