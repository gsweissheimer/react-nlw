import React, { useState } from "react";
import Button from "components/button/button";
import Text from "components/text/text";
import style from "./notificationBanner.module.css"; 

interface NotificationBannerProps {
  notifications: string[];
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ notifications }) => {
  const [visible, setVisible] = useState(notifications.length > 0);

  if (!visible || notifications.length === 0) return null;

  return (
    <div className={style.notificationBanner}>
      <div className={style.notificationContent}>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <Text type='secondary' className='no-margin'>- {notification}</Text>
              </li>
          ))}
        </ul>
      </div>
        <Button type='close' onclick={() => setVisible(false)}>
          &times;
        </Button>
    </div>
  );
};

export default NotificationBanner;
