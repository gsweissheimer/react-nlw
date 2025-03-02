import { Event } from 'types';
import api from './Api';

const eventService = {
    insertEvent: async (params: { event: Event, callback: (data: any) => void }) => {
        api.post('/event/add', params.event).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};

export default eventService;