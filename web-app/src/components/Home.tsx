import React from 'react';

import { UserInterface } from '../../../server/src/database/models/UserModel';

interface HomeInterface {
  user:UserInterface;
}
export const Home:React.FC<HomeInterface> = ({ user = {} }) => {
  const { email = "", subscriptions = [] } = user;
  return (
    <div className="Home">
      {`Email: ${email}`}
      {`Number of subscriptions: ${subscriptions.length}`}
    </div>
  );
}
