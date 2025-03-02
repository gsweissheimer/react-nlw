export type EventAction = {
    label: string;
    value: string;
};

export const EventActions: EventAction[] = [
    { label: 'Vomitou', value: 'vomitou' },
    { label: 'Não quis comer', value: 'nao-quis-comer' },
    { label: 'Está Agitado', value: 'esta-agitado' },
    { label: 'Bola de pelos', value: 'bola-de-pelos' },
    { label: 'Está Amoado', value: 'esta-amoado' }
];

export interface Event {
    id?: string;
    name: string | null;
    value?: string;
    type?: string;
    entityId?: string;
    entityType?: string;
    eventDate?: string;
}