import { useContext } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import UserProfile from '../../components/userProfile/userProfile';
import { AuthContext } from "../../context/AuthContext";
import './Profile';

const Profile = () => {

    const { user } = useContext(AuthContext);
    
    return (
        <Dashboard pageTitle='Profile'>
            {user && <UserProfile User={user} />}
        </Dashboard>
    );
};

export default Profile;