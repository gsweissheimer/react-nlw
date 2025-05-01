import React, {useContext} from 'react';
import { Pet, EventActions, User } from "../../types";
import { Event } from '../../types/';
import Button from 'components/button/button';
import EventForm from 'components/eventForm/eventForm';
import { AuthContext } from '../../context/AuthContext';

import styles from './eventsActions.module.css';
import Modal from 'components/modal/modal';
import { useState } from 'react';

interface PetActionProps {
    Pet?: Pet;
    entity: string;
    _handleEvent: (e: React.MouseEvent<HTMLButtonElement>, entityId: string, entityType: string) => void;
}

const EventsActions: React.FC<PetActionProps> = ({ Pet, entity, _handleEvent }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useContext(AuthContext);

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
                <Button dataEventValue={action.value} key={index} type='primary' onclick={e => _handleEvent(e, entityId, entity)}>{action.label}</Button>
            ))}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <EventForm />
            </Modal>
        </div>
    );
};

export default EventsActions;