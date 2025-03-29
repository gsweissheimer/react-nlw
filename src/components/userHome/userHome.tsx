import React, { useEffect, useState } from 'react';

import { User } from '../../types';

import UserAction from './userAction';

import DashboardPetCard from '../dashboardPetCard/dashboardPetCard';
import NotificationBanner from "../notificationBanner/notificationBanner";
import Calendar from '../calendar/Calendar';

import styles from "./userHome.module.css";
import HighlightText from 'components/highlightText/highlightText';
import { useEvent } from 'hooks/useEvent';


interface UserHomeProps {
  User: User;
}

const UserHome: React.FC<UserHomeProps> = ({ User }) => {

const notifications = ["Consulta da Quinn", "Aniversário do Samuel"];
const currentDate = new Date();
const _month = currentDate.getMonth() + 1;
const _year = currentDate.getFullYear();
const [year, setYear] = useState(_year);
const [month, setMonth] = useState(_month);

const { Events, getEventsByTutorId } = useEvent();

useEffect(() => {
  if(User != null && Events == null) getEventsByTutorId({ id: User.tutorId });
  console.log(Events);
}, [User, Events, getEventsByTutorId]);


const actions = Events?.map(event => ({
  date: event.eventDate || "",
  description: event.name || ""
})) || [];

  return (
    <div className={styles.homeContent} >

      <NotificationBanner notifications={notifications} />

      <UserAction User={User} />

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

