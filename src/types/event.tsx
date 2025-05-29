export interface EntityOption {
    label: string;
    value: string;
  }

  export type EventAction = {
      label: string;
      value: string;
      entity: string;
  };

export interface Event {
    id?: string;
    name: string | null;
    value?: string;
    tooltip?: string;
    type?: string;
    entityId?: string;
    entityType?: string;
    eventDate?: string;
}