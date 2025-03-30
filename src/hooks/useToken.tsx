import Cookies from 'js-cookie';
import { useCallback } from 'react';

export function useToken() {

    const getUserIdFromToken = useCallback(() => {
        const token: string | undefined = getToken();
        if (!token) return 0;
        const payloadBase64 = token.split(".")[1];
        const payloadDecoded = JSON.parse(atob(payloadBase64));
        return payloadDecoded.id;
    }, []);

    const getToken = () => {
        return Cookies.get('catdogtok')
    }

    const removeToken = () => {
        Cookies.remove('catdogtok');
    };

    return {
            getUserIdFromToken,
            getToken,
            removeToken
        }
    
}