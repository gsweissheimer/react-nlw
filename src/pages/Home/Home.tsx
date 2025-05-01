import { useContext } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import UserHome from '../../components/userHome/userHome';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-content">
      <Dashboard>
        {user &&
          <UserHome />
        }
      </Dashboard>
    </div>
  );
};

export default Home;