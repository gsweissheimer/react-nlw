import React from 'react';
import { Pet } from "../../types";
import Button from 'components/button/button';

interface PetActionProps {
    Pet?: Pet; 
}

const PetAction: React.FC<PetActionProps> = ({ Pet }) => {

    return (
        <div className='pet-action'>
            <Button type='primary'>Vomitou</Button>
            <Button type='primary'>Não quis comer</Button>
            <Button type='primary'>Está Agitado</Button>
            <Button type='primary'>Bola de pelos</Button>
        </div>
    );
};

export default PetAction;