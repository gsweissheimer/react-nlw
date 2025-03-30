import React from 'react';
import DashboardPetCard from '../dashboardPetCard/dashboardPetCard';
import DashboardFamilyCard from '../dashboardFamilyCard/dashboardFamilyCard';

import { User } from '../../types';

// import Events from '../events/events'
import HighlightText from 'components/highlightText/highlightText';

interface UserHomeProps {
  User: User;
}

const UserHome: React.FC<UserHomeProps> = ({ User }) => {
  
  return (
    <div className="home-content">
      <HighlightText type='primary'>{ User?.name }</HighlightText>
        <div className="dashboard">
          
          <div className="dash-box quarter">
            { User.family && (
              <DashboardFamilyCard Family={User.family} />
            ) }
          </div>
          
          {/* <Events></Events> */}

          <div className="dash-box full">
            { User.pets && (
              <DashboardPetCard user={User} isProfile={true}/>
            ) }
          </div>

        </div>
    </div>
  );
};

export default UserHome;