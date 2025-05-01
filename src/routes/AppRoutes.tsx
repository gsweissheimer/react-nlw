    import React, { useEffect } from 'react';
import { setupAxiosInterceptors } from '../services/Api';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PrivatedRoutes from './PrivatedRoutes';
import Login from '../pages/Login/Login';
import Logout from '../pages/Login/logout';
import Terminal from '../pages/Terminal/Terminal';

const AppRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setupAxiosInterceptors(navigate);
    }, [navigate]);
    
    return (
        <>
            <Routes>
                <Route path="/meu-amigo" element={<Terminal />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/*" element={<PrivatedRoutes />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
