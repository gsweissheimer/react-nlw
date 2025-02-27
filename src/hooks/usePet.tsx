import { useState } from 'react';

import service from '../services/Pet';

export function usePet() {

    const [ Pet, SetPet ] = useState();
    const [ Pets, SetPets ] = useState();
    
    const getPet = (params: { id: string }) => {
        service.getPet({id: params.id, callback: SetPet});
    }

    const getPets = (params: { id: string, }) => {
        service.getPets({id: params.id, callback: SetPets});
    }

    return {
            Pet,
            getPet,
            Pets,
            getPets
        }
    
}