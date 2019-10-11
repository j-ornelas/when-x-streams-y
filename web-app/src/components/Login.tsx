import React, { useState } from 'react';
import { ServerResponseInterface } from '../interfaces/serverResponse';

interface LoginInterface {
  setLogin:Function;
}
export const Login:React.FC<LoginInterface> = ({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createUser = () => { // TODO: refac this to promises folder.
    // TODO: do all sorts of validation here.
    fetch('/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res:any) => res.json())
      .then(({ success, token, message, }:ServerResponseInterface) => {
        setLogin(success); //TODO: set token.
      })
  }
  return (
    <div className="Login">
      <div className="input">
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
      <div
        className="create-button"
        style={{ width: '100px', height: '50px', backgroundColor: 'red' }}
        onClick={createUser}
      />
    </div>
  );
}
