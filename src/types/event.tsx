export interface EntityOption {
    label: string;
    value: string;
  }

  export type EventAction = {
      label: string;
      value: string;
      entity: string;
      type?: string;
  };

export interface Event {
    id?: string;
    name: string | null;
    value?: string;
    tooltip?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    type?: string;
    entityId?: string;
    entityType?: string;
    eventDate?: string;
}