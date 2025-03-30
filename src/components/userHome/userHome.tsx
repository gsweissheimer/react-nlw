import React, { useEffect, useState } from 'react';

import { User } from '../../types';

import EventsActions from '../eventsActions/eventsActions';

import DashboardPetCard from '../dashboardPetCard/dashboardPetCard';
// import NotificationBanner from "../notificationBanner/notificationBanner";
import Calendar from '../calendar/Calendar';

import styles from "./userHome.module.css";
import HighlightText from 'components/highlightText/highlightText';
import { useEvent } from 'hooks/useEvent';


interface UserHomeProps {
  User: User;
}

const UserHome: React.FC<UserHomeProps> = ({ User }) => {

// const notifications = ["Consulta da Quinn", "Aniversário do Samuel"];
const currentDate = new Date();
const _month = currentDate.getMonth() + 1;
const _year = currentDate.getFullYear();
const [year, setYear] = useState(_year);
const [month, setMonth] = useState(_month);

const { Events, getEventsByTutorId, SetEvents, handleEvent } = useEvent();

const [actions, setActions] = useState(() => 
  Events?.map(event => ({
  date: event.eventDate || "",
  description: event.name || ""
  })) || []
);

useEffect(() => {
  if (User?.tutorId) {
      getEventsByTutorId({ id: User.tutorId });
  }
}, [User?.tutorId]);

useEffect(() => {
  if (Events) {
    setActions(
      Events.map(event => ({
        date: event.eventDate || "",
        description: event.name || ""
      }))
    );
  }
}, [Events]);

  return (
    <div className={styles.homeContent} >

      {/* <NotificationBanner notifications={notifications} /> */}

      <EventsActions User={User} entity='family' _setEvents={SetEvents} _handleEvent={handleEvent} />

      <HighlightText type='primary'>{User.name}</HighlightText>

      { User.pets && (
        <DashboardPetCard user={User} />
      )}

      <div className="dash-box full">
        <Calendar year={year} month={month} actions={actions} setMonth={setMonth} setYear={setYear} />
      </div>
      
    </div>
  );
};

export default UserHome;

