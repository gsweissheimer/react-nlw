import { useState } from 'react';

import service from '../services/Pet';
import { Pet } from 'types';

export function usePet() {

    const [ Pet, SetPet ] = useState();
    const [ Pets, SetPets ] = useState();
    
    const getPet = (params: { id: string }) => {
        service.getPet({id: params.id, callback: SetPet});
    }

    const getPets = (params: { id: string, }) => {
        service.getPets({id: params.id, callback: SetPets});
    }

    const insertPet = async (params: { pet: Pet }) => {
        await service.insertPet({pet: params.pet, callback: SetPet});
    }

    return {
            Pet,
            getPet,
            Pets,
            getPets,
            insertPet
        }
    
}