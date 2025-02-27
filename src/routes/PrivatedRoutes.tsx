import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { setupAxiosInterceptors } from '../services/Api'; // Importa o setup do interceptor

import Home from '../pages/Home/Home';
import Pet from '../pages/Pet/Pet';
import Profile from '../pages/Profile/Profile';

// Configurar interceptores para tratar 401
const PrivatedRoutes = () => {
    const navigate = useNavigate(); // Hook de navegação

    useEffect(() => {
        setupAxiosInterceptors(navigate);
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pet/:id" element={<Pet />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default PrivatedRoutes;