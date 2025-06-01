export interface History {
  name: string;
  type: string;
  data?: HistoryItem[]
};

export type HistoryItem = {
  eventDate: Date | string;
  petId?: string;
  eventType: string;
  eventTypeLabel: string;
  name: string;
  actions?: React.ReactNode;
};