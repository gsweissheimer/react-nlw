import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('https://nodejs-nlw.railway.internal', { transports: ['websocket'], withCredentials: true });


function App() {
    useEffect(() => {

        const handleNotification = (data: any) => {
            console.log('Dados recebidos: ', data);
            toast.info(data.message);
        };
    
        socket.on('connect', () => console.log('Conectado!'));
        socket.on('connect_error', (err) => console.error('Erro de conexão:', err));
        socket.on('notification', handleNotification);
    
        return () => {
            console.log("Desconectando...");
            socket.off('connect');
            socket.off('connect_error');
            socket.off('notification', handleNotification);
        };
    }, []);

    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
                <ToastContainer position="top-left" autoClose={5000} />
            </Router>
        </AuthProvider>
    );
}

export default App;
