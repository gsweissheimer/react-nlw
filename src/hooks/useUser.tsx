import { useState,useCallback } from 'react';

import service from '../services/User';
import { User } from 'types';

export function useUser() {

    const [ User, SetUser ] = useState<User>();
    
    const getUser = useCallback(async (params: { id: string }) => {
        await service.getUser({ id: params.id, callback: SetUser });
    }, [SetUser]);

    return {
            User,
            getUser,
            SetUser
        }
    
}