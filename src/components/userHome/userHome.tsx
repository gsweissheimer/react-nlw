import React, { useEffect, useState, useContext } from 'react';

import EventsActions from '../eventsActions/eventsActions';

import DashboardPetCard from '../dashboardPetCard/dashboardPetCard';
// import NotificationBanner from "../notificationBanner/notificationBanner";
import Calendar from '../calendar/Calendar';

import styles from "./userHome.module.css";
import HighlightText from 'components/highlightText/highlightText';
import { useEventContext } from '../../context/EventContext';
import {AuthContext} from '../../context/AuthContext';

const UserHome: React.FC = () => {

// const notifications = ["Consulta da Quinn", "Aniversário do Samuel"];
const currentDate = new Date();
const _month = currentDate.getMonth() + 1;
const _year = currentDate.getFullYear();
const [year, setYear] = useState(_year);
const [month, setMonth] = useState(_month);

const { Events, getEventsByTutorId, handleEvent } = useEventContext();
const { user } = useContext(AuthContext);

const [actions, setActions] = useState(() => 
  Events?.map(event => ({
    id: event.id || "",
    date: event.eventDate || "",
    description: event.name || "",
    tooltip: event.tooltip || "",
  })) || []
);

useEffect(() => {
  if (user?.tutorId) {
      getEventsByTutorId({ id: user.tutorId });
  }
}, [user?.tutorId]);

useEffect(() => {
  if (Events) {
    setActions(
      Events.map(event => ({
        id: event.id || "",
        date: event.eventDate || "",
        description: event.name || "",
        tooltip: event.tooltip || "",
      }))
    );
  }
}, [Events]);

  return (
    <div className={styles.homeContent} >

      {/* <NotificationBanner notifications={notifications} /> */}

      <EventsActions entity='family' _handleEvent={handleEvent} />

      <HighlightText type='primary'>{user?.name}</HighlightText>

      { user?.pets && (
        <DashboardPetCard user={user} />
      )}

      <div className="dash-box full">
        <Calendar year={year} month={month} actions={actions} setMonth={setMonth} setYear={setYear} />
      </div>
      
    </div>
  );
};

export default UserHome;

