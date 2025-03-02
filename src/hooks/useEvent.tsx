import { useState } from 'react';

import service from '../services/Event';
import { Event } from 'types';

export function useEvent() {

    const [ Event, SetEvent ] = useState<Event | null>(null);

    const insertEvent = async (params: { event: Event }) => {
        await service.insertEvent({event: params.event, callback: SetEvent});
    }

    return {
            Event,
            SetEvent,
            insertEvent
        }
    
}