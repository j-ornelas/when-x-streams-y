import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { ServerResponseInterface } from './interfaces/serverResponse';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setLogin] = useState(false);
  const handleRes = (({ success, users, message, token }:ServerResponseInterface) => { // TODO: refac this to its own helper.
    if (token) setLogin(success || false);
    setUsers(users);
    setErrorMsg(message || '');
  })
  useEffect(() => {
    fetch('/users/get').then(res => res.json()) // TODO: refac promises away
    .then((data) => handleRes(data))
    .catch((err:any) => setErrorMsg(err.toString())) //TODO: remove any here.
  }, [users]);
  return (
    <div className="App">
      <div>{errorMsg ? errorMsg : `number of users in system: ${users.length}`}</div>
      {isLoggedIn ? <div>you are logged in</div> : <Login setLogin={setLogin}/>}
    </div>
  );
}

export default App;
