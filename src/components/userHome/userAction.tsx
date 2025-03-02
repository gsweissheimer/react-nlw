import React from 'react';
import { User } from '../../types';
import Button from 'components/button/button';

interface PetActionProps {
    User: User; 
}

const PetAction: React.FC<PetActionProps> = ({ User }) => {

    return (
        <div className='pet-action'>
            <Button type='secondary'>Personalizado</Button>
            <Button type='primary'>Vomito</Button>
            <Button type='primary'>Bola de pelos</Button>
        </div>
    );
};

export default PetAction;