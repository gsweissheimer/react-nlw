import api from './Api';

const petService = {
    getPet: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/pet/${params.id}`).then((response) => {
            params.callback(response.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    },
    getPets: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/pets/${params.id}`).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};

export default petService;