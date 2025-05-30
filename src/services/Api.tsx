import axios from 'axios';
import Cookies from 'js-cookie';

// Criação de uma instância do Axios
const api = axios.create({
    baseURL: 'https://nodejs-nlw-production.up.railway.app/miau', // Coloque sua URL base aqui
    // baseURL: 'http://localhost:3001/miau', // Coloque sua URL base aqui
});

// Adicionando o token Bearer automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Tenta obter o token do localStorage ou dos cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para respostas (redirecionar ao login se for 401)
export const setupAxiosInterceptors = (navigate: (path: string) => void) => {
    api.interceptors.response.use(
        (response) => response, // Se a resposta for bem-sucedida, simplesmente retorna
        (error) => {
            const url = error.config?.url;
            // Verifica se o erro é 401 e se a rota é protegida (/miau)
            if (error.response?.status === 403 || error.response?.status === 401) {
                Cookies.remove('catdogtok'); // Remove o token inválido
                navigate('/login'); // Redireciona o usuário para a página de login
            }
            return Promise.reject(error);
        }
    );
};

export default api;
