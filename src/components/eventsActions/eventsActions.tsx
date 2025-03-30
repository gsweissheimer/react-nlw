import React from 'react';
import { Pet, EventActions, User } from "../../types";
import { Event } from '../../types/';
import Button from 'components/button/button';

import styles from './eventsActions.module.css';

interface PetActionProps {
    Pet?: Pet;
    User?: User;
    entity: string;
    _handleEvent: (e: React.MouseEvent<HTMLButtonElement>, entityId: string, entityType: string) => void;
    _setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
}

const EventsActions: React.FC<PetActionProps> = ({ Pet, User, entity, _handleEvent, _setEvents }) => {

    const getEntityId = () => {
        if (entity === 'pet') return Pet?.id || '';
        if (entity === 'family') return User?.family?.id || '';
        if (entity === 'tutor') return User?.tutorId || '';
        return '';
    };
    
    const entityId: string = getEntityId();

    return (
        <div className={styles.action}>
            <Button type='secondary' onclick={e => _handleEvent(e, entityId, entity)}>Personalizado</Button>
            {EventActions.filter(action => action.entity === entity || action.entity === 'all').map((action, index) => (
                <Button dataEventValue={action.value} key={index} type='primary' onclick={e => _handleEvent(e, entityId, entity)}>{action.label}</Button>
            ))}
        </div>
    );
};

export default EventsActions;