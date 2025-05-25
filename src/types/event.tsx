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
    { label: 'Agressivo', value: 'agressivo', entity: "pet" },
    { label: 'Vomito', value: 'vomitou', entity: "pet" },
    { label: 'Não quis comer', value: 'nao-quis-comer', entity: "pet" },
    { label: 'Miando Muido', value: 'miando-muito', entity: "pet" },
    { label: 'Agitado', value: 'agitado', entity: "pet" },
    { label: 'Bola de pelos', value: 'bola-de-pelos', entity: "pet" },
    { label: 'Xixi Fora', value: 'mijou-fora', entity: "pet" },
    { label: 'Cocô Fora', value: 'coco-fora', entity: "pet" },
    { label: 'Amoado', value: 'amoado', entity: "pet" },
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