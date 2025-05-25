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
    { label: 'Agressivo', value: 'vomitou', entity: "all" },
    { label: 'Vomito', value: 'vomitou', entity: "all" },
    { label: 'Não quis comer', value: 'nao-quis-comer', entity: "pet" },
    { label: 'Verbalizando Excessivamente', value: 'nao-quis-comer', entity: "pet" },
    { label: 'Agitado', value: 'esta-agitado', entity: "pet" },
    { label: 'Bola de pelos', value: 'bola-de-pelos', entity: "all" },
    { label: 'Xixi Fora', value: 'mijou-fora', entity: "all" },
    { label: 'Cocô Fora', value: 'mijou-fora', entity: "all" },
    { label: 'Amoado', value: 'esta-amoado', entity: "pet" },
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