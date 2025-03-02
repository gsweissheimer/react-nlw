import { Pet } from 'types';
import api from './Api';

const petService = {
    getPet: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/pet/${params.id}`).then((response) => {
            params.callback(response.data.data[0]);
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
    }
};

export default petService;