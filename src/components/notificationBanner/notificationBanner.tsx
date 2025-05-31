import React, { useState } from "react";
import Button from "components/button/button";
import Text from "components/text/text";
import style from "./notificationBanner.module.css";
import { Event } from "types";
import HighlightText from "components/highlightText/highlightText";
import { useEventContext } from "context/EventContext";

interface NotificationBannerProps {
  notifications: Event[];
  onClose?: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ notifications, onClose }) => {
  const [visible, setVisible] = useState(notifications.length > 0);
  const { inactivateEvent } = useEventContext();

  const handleInactiveEvent = (id: string) => {
    inactivateEvent(id)
  }

  
  if (!visible || notifications.length === 0) return null;

  return (
    <div className={style.notificationBanner}>
      <div className={style.notificationContent}>
        <HighlightText type='secondary' className='white-title'>Notificações</HighlightText>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <Button type='close' onclick={() => handleInactiveEvent(notification.id!)}>
                &times;
              </Button>
              <Text type='secondary' className='no-margin'>
                <span>{notification.tooltip}</span> - {notification.name}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      {onClose && <Button type='close' onclick={() => setVisible(false)}>
        &times;
      </Button>}
    </div>
  );
};

export default NotificationBanner;
