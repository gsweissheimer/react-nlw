
import { Event } from '../types/';
import api from './Api';

const eventService = {
    insertEvent: async (params: { event: Event }): Promise<Event> => {
        try {
            const response = await api.post('/event/add', params.event);
            const event = params.event;
            event.id = response.data.data;
            return event;
        } catch (error) {
            console.log(error);
            throw error; // Re-throw the error to ensure the function always returns or throws
        }
    },
    deleteEventsById: async (params: { id: string }): Promise<boolean> => {
        try {
            await api.delete(`/event/${params.id}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getEventsByTutorId: async (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/event/${params.id}`).then((response) => {
            params.callback(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    },
    getEventsByPetId: async (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/event/pet/${params.id}`).then((response) => {
            params.callback(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};


export default eventService;