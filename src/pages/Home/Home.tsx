import { useEffect } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import UserHome from '../../components/userHome/userHome';

import { useUser } from '../../hooks/useUser';
import { useToken } from '../../hooks/useToken';

const Home = () => {
  
  const { User, getUser } = useUser();
  const { getUserIdFromToken } = useToken();
  
  useEffect(() => {
    if(!User) {
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