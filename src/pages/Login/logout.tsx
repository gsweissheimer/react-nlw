import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';

const Logout = () => {
    const navigate = useNavigate();
    const { removeToken } = useToken();

    useEffect(() => {
        removeToken();
        navigate('/login');
    }, [removeToken, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;