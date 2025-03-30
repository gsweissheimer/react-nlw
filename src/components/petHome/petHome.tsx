import React, {useState} from 'react';
import Calendar from '../calendar/Calendar';
import { Pet } from "../../types";

import EventsActions from '../eventsActions/eventsActions';

import HighlightText from '../highlightText/highlightText';
import Events from '../events/events'
import Text from '../text/text';

interface PetHomeProps {
  Pet?: Pet; 
}

const PetHome: React.FC<PetHomeProps> = ({ Pet }) => {

    const calculateAge = (birthdate: string) => {
      const birthDate = new Date(birthdate);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
  
      if (months < 0) {
        years--;
        months += 12;
      }
  
      return `${years} anos`;
    };
    const currentDate = new Date();
    const _month = currentDate.getMonth() + 1;
    const _year = currentDate.getFullYear();
    const [year, setYear] = useState(_year);
    const [month, setMonth] = useState(_month);
    const actions = [
      { date: '2024-12-03', description: 'Vomitou' },
      { date: '2024-12-05', description: 'Não quis comer' },
      { date: '2024-12-10', description: 'Está Agitado' },
      { date: '2024-12-10', description: 'Vomitou' }, // Duas ações no mesmo dia
    ];
  
  
    return (
      <div className="pet-content">
        
        <EventsActions Pet={Pet} entity='pet' />

          {Pet && (
            <>
              <div className="dashboard">

                <div className="dash-box full pet-box">

                  <HighlightText type='primary'>{ Pet.name }</HighlightText>
                  <Text type='secondary' className='no-margin'>{ Pet.type }</Text>
                  <Text type='secondary' className='no-margin'>{ calculateAge(Pet.birthDate) }</Text>
                  <Text type='secondary' className='no-margin'>{ Pet.microchip ? 'Com chip' : 'Sem chip' }</Text>

                </div>

                <div className="dash-box half">
                  <Events></Events>
                </div>
                <div className="dash-box half">
                  <Events></Events>
                </div>

                <div className="dash-box full">
                  <Calendar year={year} month={month} actions={actions} setMonth={setMonth} setYear={setYear} />
                </div>

            </div>

            </>
          )}
      </div>
    );
};

export default PetHome;