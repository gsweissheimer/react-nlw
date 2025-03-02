import React from 'react';
import { Pet, EventActions, Event } from "../../types";
import { useEvent } from '../../hooks/useEvent';
import Button from 'components/button/button';

interface PetActionProps {
    Pet?: Pet; 
}

const PetAction: React.FC<PetActionProps> = ({ Pet }) => {

    const { insertEvent } = useEvent()

    const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
        const eventValue: Event = {
            name: event.currentTarget.textContent,
            value: event.currentTarget.dataset.eventValue,
            type: 'event',
            entityId: Pet?.id,
            entityType: 'pet',
            eventDate: new Date().toISOString()
        }
        if (Pet) {
            insertEvent({ event: eventValue }).then(() => {
                console.log('Evento inserido com sucesso');
            }).catch((error) => {
                console.error('Erro ao inserir evento:', error);
            });
        }
    };

    return (
        <div className='pet-action'>
            <Button type='secondary' onclick={e => handleEvent(e)}>Personalizado</Button>
            {EventActions.map((action, index) => (
                <Button dataEventValue={action.value} key={index} type='primary' onclick={e => handleEvent(e)}>{action.label}</Button>
            ))}
        </div>
    );
};

export default PetAction;