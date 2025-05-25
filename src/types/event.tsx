export interface EntityOption {
    label: string;
    value: string;
  }

  export type EventAction = {
      label: string;
      value: string;
      entity: string;
  };

export const EventActions: EventAction[] = [
    { label: 'Agressivo', value: 'agressivo', entity: "all" },
    { label: 'Vomito', value: 'vomitou', entity: "all" },
    { label: 'Não quis comer', value: 'nao-quis-comer', entity: "all" },
    { label: 'Miando Muido', value: 'miando-muito', entity: "all" },
    { label: 'Agitado', value: 'agitado', entity: "all" },
    { label: 'Bola de pelos', value: 'bola-de-pelos', entity: "all" },
    { label: 'Xixi Fora', value: 'mijou-fora', entity: "all" },
    { label: 'Cocô Fora', value: 'coco-fora', entity: "all" },
    { label: 'Amoado', value: 'amoado', entity: "all" },
];

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