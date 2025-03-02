import { useState } from 'react';

import service from '../services/User';
import { User } from 'types';

export function useUser() {

    const [ User, SetUser ] = useState<User>();
    
    const getUser = async (params: { id: string }) => {
        await service.getUser({id: params.id, callback: SetUser});
    }

    return {
            User,
            getUser,
            SetUser
        }
    
}