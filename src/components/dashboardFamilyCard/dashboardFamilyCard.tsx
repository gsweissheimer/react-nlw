import React from 'react';
import { Family } from "../../types/index";

import style from './dashboardFamilyCard.module.css';
import HighlightText from 'components/highlightText/highlightText';
import Text from 'components/text/text';

interface DashboardFamilyCardProps {
  Family: Family;
}

const DashboardFamilyCard: React.FC<DashboardFamilyCardProps> = ({ Family }) => {
  return (
    <div className={style.familyMain}>
      <Text type='primary' className={style.familyCard}>Família</Text>
      <HighlightText type='secondary'>{ Family.name }</HighlightText>
      <div className={style.familyCards}>
        { Family.users.map((user, index) => ( 
          <>
            <Text type='primary' className={style.familyCard}>Membros</Text>
            <HighlightText key={index} type='secondary'>{ user.name }</HighlightText>
          </>
        ))}
      </div>
    </div>
  );
};

export default DashboardFamilyCard;