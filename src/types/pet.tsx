import { HistoryItem } from "./history";

export interface Pet {
  id?: string;
  name: string;
  type: string;
  color?: string;
  breedId: string;
  tutorId: string;
  birthDate: string;
  microchip: boolean;
  isVaccinated?: boolean
  isCastrated?: boolean
  isFiev?: boolean
  isFelv?: boolean
  dewormedExpirationDate?: Date | null
  antiFleaExpirationDate?: Date | null
  history?: HistoryItem[];
}