import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { ServerResponseInterface } from './interfaces/serverResponse';
import { UserInterface } from '../../server/src/database/models/UserModel';

import './App.css';

const App: React.FC = () => {
  const [allUsers, setUsers] = useState([]);
  const [user, setUser] = useState<UserInterface|null>(null); //TODO: can we not use this?
  const [errorMsg, setErrorMsg] = useState(''); //TODO set this in app.jsx and use it globally
  const [isLoggedIn, setLogin] = useState(false);
  const handleRes = (({ success, users, error, user }:ServerResponseInterface) => { // TODO: refac this to its own helper.
    if (user) setLogin(success || false);
    setUsers(users);
    setErrorMsg(error || '');
  })
  useEffect(() => {
    fetch('/users/get').then(res => res.json()) // TODO: refac promises away
    .then((data) => handleRes(data))
    .catch((err:any) => setErrorMsg(err.toString())) //TODO: remove any here.
  }, [isLoggedIn]);
  return (
    <div className="App">
      <div>{errorMsg ? errorMsg : `number of users in system: ${allUsers.length}`}</div>
      <div>{user ? <Home user={user} /> : <Login setLogin={setLogin} setUser={setUser} />}</div>
    </div>
  );
}

export default App;
