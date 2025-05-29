import Text from 'components/text/text';
import React from 'react';
import { Pet } from 'types';

interface PetFlagsProps {
    Pet: Pet;
}
const PetFlags: React.FC<PetFlagsProps> = ({ Pet }) => {
    const now = new Date();

    return (
        <>
            {(Pet.dewormedExpirationDate && new Date(Pet.dewormedExpirationDate) > now) && <Text type='badge' className='no-margin blueBadge'>Vermifugado</Text>}
            {(Pet.antiFleaExpirationDate && new Date(Pet.antiFleaExpirationDate) > now) && <Text type='badge' className='no-margin purpleBadge'>Anti Pulgas em Dia</Text>}
            {Pet.isCastrated  && <Text type='badge' className='no-margin greenBadge'>Castrado</Text>}
            {Pet.isVaccinated && <Text type='badge' className='no-margin orangeBadge'>Vacinado</Text>}
            {Pet.isFiev       && <Text type='badge' className='no-margin pinkBadge'>Fiv</Text>}
            {Pet.isFelv       && <Text type='badge' className='no-margin redBadge'>Felv</Text>}
            {Pet.microchip    && <Text type='badge' className='no-margin yellowBadge'>Chipado</Text>}
        </>
    );
};

export default PetFlags;