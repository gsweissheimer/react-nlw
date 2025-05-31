
import { Event, EventAction } from '../types/';
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
    inactiveEventById: async (params: { id: string }): Promise<boolean> => {
        try {
            const response = await api.put(`/event/${params.id}/inactive`);
            return response.data; 
        }
        catch (error) {
            console.error('Erro ao inativar evento:', error);
            return false; // Return null if the event could not be inactivated
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
    },
    getEventActions: async (params: { callback: (data: any) => void }): Promise<void> => {
        await api.get('/actions').then((response) => {
            params.callback(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }

};


export default eventService;