import { HistoryItem } from 'types';
import api from './Api';

const petHistoryService = {
    insertHistoryItem: async (params: { historyItem: HistoryItem }): Promise<HistoryItem> => {
        try {
            const response = await api.post(`/history/create`, params.historyItem);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default petHistoryService;