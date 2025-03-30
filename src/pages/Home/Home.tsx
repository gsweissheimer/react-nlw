import { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import UserHome from '../../components/userHome/userHome';

import { useUser } from '../../hooks/useUser';
import { useToken } from '../../hooks/useToken';

const Home = () => {

  const { User, getUser } = useUser();
  const { getUserIdFromToken } = useToken();

  useEffect(() => {
    if(User == null) {
      getUser({ id: getUserIdFromToken().toString() });
    }
  }, [User]);

  return (
    <div className="home-content">
      <Dashboard>
        {User &&
          <UserHome User={User} />
        }
      </Dashboard>
    </div>
  );
};

export default Home;