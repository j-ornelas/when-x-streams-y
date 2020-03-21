import React, { useState } from 'react';
import { ServerResponseInterface } from '../interfaces/serverResponse';

interface LoginInterface {
  setLogin:Function;
  setUser:Function;
}
export const Login:React.FC<LoginInterface> = ({ setLogin, setUser }) => {
  const [email, setEmail] = useState('');
  const [authType, setAuthType] = useState('create');
  const toggleAuthType = () => setAuthType(authType === 'create' ? 'login' : 'create');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => { // TODO: refac this to promises folder.
    setErrorMessage('');
    fetch(authType === 'create' ? '/users/create' : '/users/login-local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res:any) => res.json())
      .then(({ success, user, error }:ServerResponseInterface) => {
        console.log('info', success, error, user)
        if (success) setLogin(success); //TODO: set token.
        if (error) setErrorMessage(error);
        if (user) setUser(user);
      })
  }

  return (
    <div className="Login">
      <div className="input">
        <div>{errorMessage}</div>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="create-button"
        style={{ width: '100px', height: '50px', backgroundColor: 'red' }}
        onClick={handleSubmit}
      >
      {authType === 'create' ? 'create' : 'login'}
      </button>
      <button
        className="create-button"
        style={{ width: '100px', height: '50px', backgroundColor: 'red' }}
        onClick={toggleAuthType}
      >
      </button>
    </div>
  );
}
