import { useState } from 'react';

import service from '../services/Pet';
import { Pet } from 'types';

export function usePet() {

    const [ Pet, SetPet ] = useState();
    const [ Pets, SetPets ] = useState<Pet[]>([]);
    
    const getPet = (params: { id: string }) => {
        service.getPet({id: params.id, callback: SetPet});
    }

    const getPets = (params: { id: string, }) => {
        service.getPets({id: params.id, callback: SetPets});
    }

    const insertPet = async (params: { pet: Pet }) => {
        await service.insertPet({pet: params.pet, callback: SetPet});
    }

    const updatePet = async (params: { pet: Pet }) => {
        await service.updatePet({pet: params.pet, callback: SetPet});
    }

    const deletePet = async (params: { id: string }) => {
        const res = await service.deletePet({pet: params.id});
        if(res) {
            SetPets((prevPets: Pet[]) => prevPets.filter((pet: Pet) => pet.id !== params.id));
        }
    }

    return {
            Pet,
            getPet,
            Pets,
            getPets,
            SetPets,
            insertPet,
            deletePet,
            updatePet
        }
    
}