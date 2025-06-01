import React from 'react';
import { HistoryItem } from 'types';
import styles from './eventTable.module.css';

export type EventTableProps = {
  data: HistoryItem[];
  formatDate?: (d: Date | string) => string;
};

export const EventTable: React.FC<EventTableProps> = ({
  data,
  formatDate = d =>
    new Date(d).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
}) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.headerCell}>Data</th>
        <th className={styles.headerCell}>Tipo</th>
        <th className={styles.headerCell}>Nome</th>
        <th className={styles.headerCell}>Ações</th>
      </tr>
    </thead>

    <tbody>
      {data.map(({ eventDate, eventTypeLabel, name, actions }, idx) => (
        <tr key={idx} className={styles.row}>
          <td className={styles.date}>
            {formatDate(eventDate)}
          </td>
          <td className={styles.cells}>{eventTypeLabel}</td>
          <td className={styles.cells}>{name}</td>
          <td className={styles.actions}>{actions}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
