import React from 'react';
import { Family } from "../../types/index";

import style from './dashboardFamilyCard.module.css';
import HighlightText from 'components/highlightText/highlightText';

interface DashboardFamilyCardProps {
  Family: Family;
}

const DashboardFamilyCard: React.FC<DashboardFamilyCardProps> = ({ Family }) => {

  return (
    <div className={style.familyMain}>

      <HighlightText type='secondary'>{ Family.name }</HighlightText>

      <div className={style.familyCards}>

        { Family.users.map((user) => ( 
          <HighlightText key={user.id} type='primary'>{ user.name }</HighlightText>
        ))}

      </div>

    </div>
  );
};

export default DashboardFamilyCard;