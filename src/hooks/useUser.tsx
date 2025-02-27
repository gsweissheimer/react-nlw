import { useState } from 'react';

import service from '../services/User';

export function useUser() {

    const [ User, SetUser ] = useState();
    
    const getUser = async (params: { id: string }) => {
        await service.getUser({id: params.id, callback: SetUser});
    }

    return {
            User,
            getUser
        }
    
}