import Text from 'components/text/text';
import React from 'react';
import { Pet } from 'types';
import { FaExclamation, FaCalendar, FaPills, FaSyringe, FaPlus, FaBug } from "react-icons/fa";
import style from './warnings.module.css';

interface WarningsProps {
    Pet: Pet;
}
const Warnings: React.FC<WarningsProps> = ({ Pet }) => {
    const now = new Date();

    const closeWarning = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        document.getElementById('warningModal')?.remove();
    }

    return (
        <div id='warningModal' className={style.warningsContent}>
            <h3 className={style.title}>Avisos <FaPlus onClick={closeWarning} /></h3>

            {(Pet.dewormedExpirationDate
                && new Date(Pet.dewormedExpirationDate) < now)
                && <Text type='badge' className='no-margin redBadge'><FaExclamation /> Vermifugo Vencido</Text>}

            {(Pet.antiFleaExpirationDate
                && new Date(Pet.antiFleaExpirationDate) < now)
                && <Text type='warning' ><FaExclamation /> Anti Pulgas Vencido</Text>}

            {/* <Text type='warning' ><FaExclamation /> Outro aviso</Text>
            <Text type='reminder' ><FaCalendar /> Consulta</Text>
            <Text type='reminder' ><FaPills /> Remedio</Text>
            <Text type='reminder' ><FaSyringe /> Vacina</Text> */}
        </div>
    );
};

export default Warnings;