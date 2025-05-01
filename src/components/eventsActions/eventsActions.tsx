import React, {useContext} from 'react';
import { Pet, EventActions, User } from "../../types";
import { Event } from '../../types/';
import Button from 'components/button/button';
import EventForm from 'components/eventForm/eventForm';
import { AuthContext } from '../../context/AuthContext';

import styles from './eventsActions.module.css';
import Modal from 'components/modal/modal';
import { useState } from 'react';
import { useEventContext } from 'context/EventContext';

interface PetActionProps {
    Pet?: Pet;
    entity: string;
}

const EventsActions: React.FC<PetActionProps> = ({ Pet, entity }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useContext(AuthContext);
        const { handleEvent } = useEventContext();

    const getEntityId = () => {
        if (entity === 'pet') return Pet?.id || '';
        if (entity === 'family') return user?.family?.id || '';
        if (entity === 'tutor') return user?.tutorId || '';
        return '';
    };
    
    const entityId: string = getEntityId();

    return (
        <div className={styles.action}>
            <Button type='secondary' onclick={e => setIsOpen(true)}>Personalizado</Button>
            {EventActions.filter(action => action.entity === entity || action.entity === 'all').map((action, index) => (
                <Button dataEventValue={action.value} key={index} type='primary' onclick={e => handleEvent(e, entityId, entity)}>{action.label}</Button>
            ))}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <EventForm onclose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default EventsActions;