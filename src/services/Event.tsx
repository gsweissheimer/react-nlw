import { Event } from 'types';
import api from './Api';

const eventService = {
    insertEvent: async (params: { event: Event, callback: (data: any) => void }) => {
        api.post('/event/add', params.event).then((response) => {
            const event = params.event;
            event.id = response.data.data;

            params.callback(event);
        }).catch((error) => {
            console.log(error);
        });
    },
    getEventsByTutorId: async (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/event/${params.id}`).then((response) => {
            params.callback(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};


export default eventService;