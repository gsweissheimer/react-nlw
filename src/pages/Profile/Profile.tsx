import { useEffect } from 'react';

import Dashboard from '../Dashboard/Dashboard';

import UserProfile from '../../components/userProfile/userProfile';
import { useToken } from '../../hooks/useToken';

import { useUser } from "../../hooks/useUser";


import './Profile';

const Profile = () => {

    const { getUserIdFromToken } = useToken();
    const id = getUserIdFromToken();
    const { User, getUser } = useUser();

    useEffect(() => {
        if (id) {
            getUser({ id });
        }
    }, [id]);
    
    return (
        <Dashboard pageTitle='Profile'>
            {User && <UserProfile User={User} />}
        </Dashboard>
    );
};

export default Profile;