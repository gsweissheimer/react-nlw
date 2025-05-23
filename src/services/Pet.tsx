import { Pet } from 'types';
import api from './Api';

const petService = {
    getPet: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/pet/${params.id}`).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },
    getPets: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/pet/add`).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },
    insertPet: async (params: { pet: Pet, callback: (data: any) => void }) => {
        api.post('/pet/add', params.pet).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },
    deletePet: async (params: { pet: string }): Promise<boolean> => {
        try {
            const response = await api.put(`/pet/delete/${params.pet}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    updatePet: async (params: { pet: Pet, callback: (data: any) => void }): Promise<boolean> => {
        try {
            const response = await api.put('/pet/', params.pet);
            params.callback(response.data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

export default petService;