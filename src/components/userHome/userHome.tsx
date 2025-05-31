import React, { useEffect, useState, useContext } from 'react';

import EventsActions from '../eventsActions/eventsActions';

import DashboardPetCard from '../dashboardPetCard/dashboardPetCard';

import Calendar from '../calendar/Calendar';

import styles from "./userHome.module.css";
import HighlightText from 'components/highlightText/highlightText';
import { useEventContext } from '../../context/EventContext';
import { AuthContext } from '../../context/AuthContext';
import NotificationBanner from 'components/notificationBanner/notificationBanner';
import Modal from 'components/modal/modal';

const UserHome: React.FC = () => {

  const currentDate = new Date();
  const _month = currentDate.getMonth() + 1;
  const _year = currentDate.getFullYear();
  const [year, setYear] = useState(_year);
  const [month, setMonth] = useState(_month);

  const { user } = useContext(AuthContext);
  const { todayEvents, getTodaysEvents, SetTodayEvents } = useEventContext();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    
    if (todayEvents == null) {
      getTodaysEvents();
    }
  }, [todayEvents, getTodaysEvents]);

  const handleCloseModal = () => {
    setIsOpen(false);
    SetTodayEvents([]);
  }
  
  return (
    <div className={styles.homeContent} >

      { todayEvents && todayEvents.length > 0 && <Modal isOpen={isOpen} onClose={() => handleCloseModal()} >
        <NotificationBanner
          notifications={todayEvents}
        />
      </Modal> }

      <div className="dash-box full">
        <EventsActions entity='family' />
      </div>

      <div className="dash-box quarter">

        <HighlightText type='primary'>{user?.name}</HighlightText>

        {user?.pets && (
          <DashboardPetCard user={user} />
        )}
      </div>
      <div className="dash-box third">
        <Calendar year={year} month={month} setMonth={setMonth} setYear={setYear} userId={user.tutorId || undefined} />
      </div>

    </div>
  );
};

export default UserHome;

