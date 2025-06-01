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
    deleteHistoryItem: async (params: { id: string }): Promise<boolean> => {
        try {
            const response = await api.delete(`/history/${params.id}`);
            return response.status === 200;
        } catch (error) {
            console.error("Error deleting history item:", error);
            throw error;
        }
    },
    updateHistoryItem: async (params: { historyItem: HistoryItem }): Promise<HistoryItem> => {
        try {
            const response = await api.put(`/history/update`, params.historyItem);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default petHistoryService;