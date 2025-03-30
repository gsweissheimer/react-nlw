import { useState } from 'react';

import service from '../services/Event';
import { Event } from '../types/';

export function useEvent() {

    const [ Event, SetEvent ] = useState<Event | null>(null);
    const [ Events, SetEvents ] = useState<Event[] | null>(null);

    const insertEvent = async (params: { event: Event }) => {
        try {
            const newEvent = await service.insertEvent({ event: params.event });
    
            if (newEvent) {
                return newEvent;
            }
        } catch (error) {
            console.error("Erro ao inserir evento:", error);
        }
    };

    const getEventsByTutorId = async (params: { id: string }) => {
        await service.getEventsByTutorId({id: params.id, callback: SetEvents});
    }

    const getEventsByPetId = async (params: { id: string }) => {
        await service.getEventsByPetId({id: params.id, callback: SetEvents});
    }

    const handleEvent = (event: React.MouseEvent<HTMLButtonElement>, entityId: string, entityType: string) => {
            const eventValue: Event = {
                name: event.currentTarget.textContent,
                value: event.currentTarget.dataset.eventValue,
                type: 'event',
                entityId: entityId,
                entityType: entityType,
                eventDate: new Date().toISOString()
            }
            
            insertEvent({ event: eventValue }).then((newEvent) => {
                console.log('Evento inserido com sucesso');
                if(newEvent) SetEvents(prevEvents => [...(prevEvents || []), newEvent]);
            }).catch((error) => {
                console.error('Erro ao inserir evento:', error);
            });
        };

    return {
            Event,
            Events,
            SetEvent,
            SetEvents,
            insertEvent,
            getEventsByTutorId,
            getEventsByPetId,
            handleEvent
        }
    
}