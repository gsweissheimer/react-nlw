import { Pet } from './pet';
import { Family } from './family';

export interface User {
    id: string;
    name: string;
    email: string;
    tutorId: string;
    pets: Pet[];
    family: Family;
}

export interface AuthContextType {
    token: string | null;
    user: User;
    login: (token: string) => void;
    logout: () => void;
}