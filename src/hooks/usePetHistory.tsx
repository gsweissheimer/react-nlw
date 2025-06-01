import { useState } from 'react';
import petHistoryService from '../services/PetHistory';
import { HistoryItem } from '../types/';

export function usePetHistory() {

    const [HistoryItem, SetHistoryItem] = useState<HistoryItem | null>(null);
    const [HistoryItems, SetHistoryItems] = useState<HistoryItem[] | null>(null);

    const insertHistoryItem = async (params: { historyItem: HistoryItem, callback: (data: any) => void }) => {
        try {
            const newHistoryItem: any = await petHistoryService.insertHistoryItem({ historyItem: params.historyItem });
            
            if (newHistoryItem) {
                params.callback(newHistoryItem.data);
            }
        } catch (error) {
            console.error("Erro ao inserir evento:", error);
        }
    };

    const deleteHistoryItem = async (params: { id: string }) => {
        const res = await petHistoryService.deleteHistoryItem({id: params.id});
        if(res) return true;
        return false;
    }

    const updateHistoryItem = async (params: { historyItem: HistoryItem, callback: (data: any) => void }) => {
        try {
            const newHistoryItem = await petHistoryService.updateHistoryItem({ historyItem: params.historyItem });

            if (newHistoryItem) {
                params.callback(newHistoryItem);
            }
        } catch (error) {
            console.error("Erro ao inserir evento:", error);
        }
    };

    return {
        HistoryItem,
        HistoryItems,
        insertHistoryItem,
        updateHistoryItem,
        SetHistoryItem,
        SetHistoryItems,
        deleteHistoryItem
    }

}