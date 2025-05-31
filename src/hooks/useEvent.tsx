import { useState } from 'react';

import service from '../services/Event';
import { Event, EventAction } from '../types/';

export function useEvent() {

    const [Event, SetEvent] = useState<Event | null>(null);
    const [Events, SetEvents] = useState<Event[] | null>(null);
    const [todayEvents, SetTodayEvents] = useState<Event[] | null>(null);
    const [EventActions, SetEventActions] = useState<EventAction[]>([]);

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
        await service.getEventsByTutorId({ id: params.id, callback: SetEvents });
    }

    const getEventActions = async () => {
        await service.getEventActions({ callback: SetEventActions });
    }

    const getEventsByPetId = async (params: { id: string }) => {
        await service.getEventsByPetId({ id: params.id, callback: SetEvents });
    }

    const getTodaysEvents = () => {
        const today = new Date().toISOString().split('T')[0];
        const events: Event[] | null = Events?.filter((event) =>
            event &&
            event.eventDate &&
            event.eventDate.startsWith(today) &&
            event.status === 'active' &&
            event.type === 'notification') || null
        SetTodayEvents(events);
    }

    const inactivateEvent = async (id: string) => {
        try {
            const updatedEvent = await service.inactiveEventById({ id });
            console.log('Evento atualizado:', updatedEvent);
            if (updatedEvent) {
                SetEvents(prevEvents => prevEvents?.map(event => event.id === id ? { ...event, status: 'inactive' } : event) || null);
                SetTodayEvents(prevTodayEvents => prevTodayEvents?.filter(event => event.id !== id) || null);
            }
        }
        catch (error) {
            console.error('Erro ao inativar evento:', error);
        }
    }


    const deleteEventsById = async (params: { id: string, _callback: React.Dispatch<React.SetStateAction<Event[] | null>> }) => {
        await service.deleteEventsById({ id: params.id }).then((response) => {
            if (response) {
                params._callback(prevEvents => [...(prevEvents?.filter(event => params.id !== event.id) || [])]);
            }
        }).catch((error) => {
            console.error('Erro ao deletar evento:', error);
        })
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
            if (newEvent) SetEvents(prevEvents => [...(prevEvents || []), newEvent]);
        }).catch((error) => {
            console.error('Erro ao inserir evento:', error);
        });
    };

    return {
        Event,
        Events,
        todayEvents,
        SetEvent,
        SetEvents,
        SetTodayEvents,
        inactivateEvent,
        insertEvent,
        getEventsByTutorId,
        getEventsByPetId,
        handleEvent,
        deleteEventsById,
        getEventActions,
        getTodaysEvents,
        EventActions
    }

}