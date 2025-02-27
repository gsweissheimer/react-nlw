import { Pet } from './pet';
import { Family } from './family';

export interface User {
    id: number;
    name: string;
    email: string;
    pets: Pet[];
    family: Family;
}