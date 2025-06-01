import React, { useState, useEffect } from 'react';
import Calendar from '../calendar/Calendar';
import { Pet } from "../../types";

import EventsActions from '../eventsActions/eventsActions';

import HighlightText from '../highlightText/highlightText';
// import Events from '../events/events'
import Text from '../text/text';
import PetFlags from 'components/petFlags/petFlags';
import Warnings from 'components/warnings/warnings';
import HistoryFeatures from 'components/historyFeatures/historyFeatures';

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

    return (
      <div className="pet-content">
          {Pet && (
            <>
              <div className="dashboard">
                <div className="box quarter">
                  <div className="dash-box full pet-box">
                    <div className="leftCard">
                      <div className="headerCard">
                        <Warnings Pet={Pet} />
                        <PetFlags Pet={Pet} />  
                      </div>
                      <div className="contentCard">
                        <HighlightText type='primary'>{ Pet.name }</HighlightText>
                      </div>
                      <div className="footerCard">
                        <Text type='secondary' className='no-margin'>Gato <span>(Felis catus)</span></Text>
                        <Text type='secondary' className='no-margin'>{ calculateAge(Pet.birthDate) }</Text>
                        <HistoryFeatures />
                      </div>
                    </div>
                  </div>
                  <div className="dash-box full pet-box">
                    <div className="leftCard">
                      <EventsActions Pet={Pet} entity='pet'/>
                    </div>
                  </div>
                </div>
                <div className="dash-box third">
                  <Calendar year={year} month={month} setMonth={setMonth} setYear={setYear}  petId={Pet.id || undefined}/>
                </div>
            </div>
            </>
          )}
      </div>
    );
};

export default PetHome;