// src/context/EventContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { useEvent } from '../hooks/useEvent';
import { Event, EventAction, Event as EventType } from '../types';

type EventContextType = {
  Event: EventType | null;
  Events: EventType[] | null;
  EventActions: EventAction[] | null;
  todayEvents: Event[] | null;
  SetEvent: React.Dispatch<React.SetStateAction<EventType | null>>;
  SetEvents: React.Dispatch<React.SetStateAction<EventType[] | null>>;
  SetTodayEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  inactivateEvent: (id: string) => Promise<void>;
  insertEvent: (params: { event: EventType }) => Promise<EventType | undefined>;
  getEventsByTutorId: (params: { id: string }) => Promise<void>;
  getEventsByPetId: (params: { id: string }) => Promise<void>;
  getEventActions: () => Promise<void>;
  getTodaysEvents: () => void;
  handleEvent: (
    e: React.MouseEvent<HTMLButtonElement>,
    entityId: string,
    entityType: string
  ) => void;
  deleteEventsById: (params: {
    id: string;
    _callback: React.Dispatch<React.SetStateAction<EventType[] | null>>;
  }) => Promise<void>;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const {
    Event,
    Events,
    EventActions,
    todayEvents,
    SetEvent,
    SetEvents,
    SetTodayEvents,
    insertEvent,
    inactivateEvent,
    getEventsByTutorId,
    getEventsByPetId,
    getEventActions,
    getTodaysEvents,
    handleEvent,
    deleteEventsById,
  } = useEvent();

  return (
    <EventContext.Provider
      value={{
        Event,
        Events,
        EventActions,
        todayEvents,
        SetEvent,
        SetEvents,
        SetTodayEvents,
        inactivateEvent,
        insertEvent,
        getEventsByTutorId,
        getEventsByPetId,
        getEventActions,
        getTodaysEvents,
        handleEvent,
        deleteEventsById,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export function useEventContext(): EventContextType {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext deve ser usado dentro de um EventProvider');
  }
  return context;
}
