import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoginAlert from './LoginAlert';

import style from './login.module.css';
import Button from 'components/button/button';

const background = '/assets/img/cute-pet-collage-isolated.jpg';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/au/login', {
                username,
                password
            });

            const tokenWithoutBearer = response.data.token.replace('Bearer ', '');
            login(tokenWithoutBearer);
            
            setMessage('Login bem-sucedido!');
            navigate('/'); // Redireciona para a página Home ("/")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data?.error || 'Erro ao fazer login.');
            } else {
                setMessage('Erro ao fazer login.');
            }
        }
    };

    return (
        <div className={style.loginComponent} style={{ backgroundImage: `url(${background})` }}>
            <div className={style.loginModal}>
                <div className={style.loginLeft} style={{ backgroundImage: `url(${background})` }}>
                    <h1 className={`${style.mainTitle} ${style.whiteTitle}`}>Cat Dog ID</h1>
                    <p className={` ${style.whiteTitle}`}>Seu sistema de identificação de gatos e cachorros.</p>
                </div>
                <div className={style.loginRight}>
                    <h2 className={style.blackTitle}>Login</h2>

                    <LoginAlert message={message} token={token} />

                    <form onSubmit={handleSubmit}>
                        <div className={style.inputContent}>
                            <input
                                type="text"
                                value={username}
                                placeholder="Usuário"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputContent}>
                            <input
                                type="password"
                                value={password}
                                placeholder="Senha"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="primary" submitButton={true}>
                            Login
                        </Button>
                    </form>

                    {/* remover */}
                    {token && (
                        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green' }}>
                            <h4>Token recebido:</h4>
                            <p>{token}</p>
                        </div>
                    )}
                    {/* remover */}
                </div>
            </div>
        </div>
    );
};

export default Login;
