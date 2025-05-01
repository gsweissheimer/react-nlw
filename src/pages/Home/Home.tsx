import { useEffect } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import UserHome from '../../components/userHome/userHome';

import { useUserState } from '../../hooks/useUserState';
import { useToken } from '../../hooks/useToken';

const Home = () => {
  
  const { user, getUser } = useUserState();
  const { getUserIdFromToken } = useToken();
  
  useEffect(() => {
    if(!user) {
      getUser({ id: getUserIdFromToken().toString() });
    }
  }, [user]);

  return (
    <div className="home-content">
      <Dashboard>
        {user &&
          <UserHome User={user} />
        }
      </Dashboard>
    </div>
  );
};

export default Home;