import React from 'react';
import { Pet, EventActions, Event } from "../../types";
import { useEvent } from '../../hooks/useEvent';
import Button from 'components/button/button';

interface PetActionProps {
    Pet?: Pet; 
}

const PetAction: React.FC<PetActionProps> = ({ Pet }) => {

    const { handleEvent } = useEvent()

    return (
        <div className='pet-action'>
            <Button type='secondary' onclick={e => handleEvent(e, Pet!.id!, 'pet')}>Personalizado</Button>
            {EventActions.map((action, index) => (
                <Button dataEventValue={action.value} key={index} type='primary' onclick={e => handleEvent(e, Pet!.id!, 'pet')}>{action.label}</Button>
            ))}
        </div>
    );
};

export default PetAction;