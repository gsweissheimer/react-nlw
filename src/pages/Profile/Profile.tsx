import { useEffect } from 'react';

import Dashboard from '../Dashboard/Dashboard';

import UserProfile from '../../components/userProfile/userProfile';
import { useToken } from '../../hooks/useToken';

import { useUserState } from "../../hooks/useUserState";


import './Profile';

const Profile = () => {

    const { getUserIdFromToken } = useToken();
    const id = getUserIdFromToken();
    const { user, getUser } = useUserState();

    useEffect(() => {
        if (id) {
            getUser({ id });
        }
    }, [id]);
    
    return (
        <Dashboard pageTitle='Profile'>
            {user && <UserProfile User={user} />}
        </Dashboard>
    );
};

export default Profile;