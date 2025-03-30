import { User } from './user';

export interface Family {
    id: string;
    name: string;
    users: User[];
}