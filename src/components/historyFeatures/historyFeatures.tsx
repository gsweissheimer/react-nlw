import React, { useEffect } from 'react';
import type { History, HistoryItem, Pet } from 'types';
import { FaPills, FaSyringe, FaBookMedical, FaFileMedical, FaBug, FaTrashAlt, FaRegEdit, FaHospital, FaPlus } from 'react-icons/fa';
import styles from './historyFeatures.module.css';
import Button from 'components/button/button';
import Modal from 'components/modal/modal';
import { EventTable } from 'components/eventTable/eventTable';
import HistoryForm from 'components/historyForm/historyForm';
import { usePetHistory } from 'hooks/usePetHistory';

interface HistoryFeaturesProps {
    Pet: Pet;
}
const HistoryFeatures: React.FC<HistoryFeaturesProps> = ({ Pet }) => {

    const [ tableIsOpen, setTableIsOpen ] = React.useState(false);
    const [ formIsOpen, setFormIsOpen ] = React.useState(false);
    const [ pet, setPet ] = React.useState<Pet>(Pet);

    const { deleteHistoryItem } = usePetHistory();

    const [ history, setHistory ] = React.useState<History>({
        name: '',
        type: '',
        data: []
    });

    const handleDleteHistoryItem = async (params: { id: string, eventType: string }) => {
        deleteHistoryItem({ id: params.id })
            .then((res) => {
                if (res) {
                  if (history.data && pet.history && pet.history) {
                    Pet.history = Pet.history?.filter(event => event.id !== params.id);
                    handleOpenTableModal(params.eventType);
                  }
                }
            })
            .catch((error) => {
                console.error("Erro ao deletar evento:", error);
            });
    }

    const handleOpenFormModal = () => {
        setFormIsOpen(true)
    }

    const handleCloseFormModal = () => {
        setFormIsOpen(false)
    }

    const handleAddHistoryItem = (historyItem: HistoryItem) => {
        Pet.history = [...Pet.history || [], historyItem];
    }
    

    function getEventTypeLabel(feature: string): string {
        switch (feature) {
            case 'feature_doctor':
                return 'Consultas';     
                break;
            case 'feature_exam':
                return 'Exames';
                break;
            case 'feature_vaccines':
                return 'Vacinas';
                break;
            case 'feature_meds':
                return 'Medicamentos';
                break;
            case 'feature_erradicators':
                return 'Erradicadores';
                break;
            case 'feature_surgery':
                return 'Cirurgias';
                break;
            default:
                return 'Outros';
                break;
        }
    }

    const handleOpenTableModal = (feature: string) => {
        
        if (!Pet.history) {
            console.error('Pet history is not available');
            return;
        }
        const events: HistoryItem[] = Pet.history?.map(event => ({
            eventDate: event.eventDate,
            eventType: event.eventType,
            eventTypeLabel: event.eventTypeLabel,
            name: event.name,
            actions:    <>
                            <Button type='icon' className={styles.closeButton} onclick={() => handleDleteHistoryItem({id: event.id!, eventType: event.eventType})}>
                                <FaTrashAlt />
                            </Button>
                            {/* <Button type='icon' className={styles.closeButton} onclick={() => handleDleteHistoryItem({id: event.id!})}>
                                <FaRegEdit />
                            </Button> */}
                        </>,
        })) || [];
        setHistory({
            name: getEventTypeLabel(feature),
            type: feature,
            data: events.filter(event => event.eventType === feature)
        });
        setTableIsOpen(true);
    };

    const handleCloseModal = () => {
        setTableIsOpen(false);
        setHistory({
            name: '',
            type: '',
            data: []
        });
    }

    return (
        <div className={styles.featuresHistoryContent}>
            <div className={styles.historyFeatures}>
                <Button onclick={() => handleOpenTableModal('feature_doctor')} className={styles.featureHistory}><FaBookMedical /> Consultas</Button> 
                <Button onclick={() => handleOpenTableModal('feature_exam')} className={styles.featureHistory}><FaFileMedical /> Exames</Button>
                <Button onclick={() => handleOpenTableModal('feature_vaccines')} className={styles.featureHistory}><FaSyringe /> Vacinas</Button>
                <Button onclick={() => handleOpenTableModal('feature_meds')} className={styles.featureHistory}><FaPills /> Medicamentos</Button>
                <Button onclick={() => handleOpenTableModal('feature_erradicators')} className={styles.featureHistory}><FaBug /> Erradicadores</Button>
                <Button onclick={() => handleOpenTableModal('feature_surgery')} className={styles.featureHistory}><FaHospital /> Cirurgias</Button>
                <Button onclick={() => handleOpenFormModal()} className={styles.featureHistory} type='secondary'><FaPlus /> Adicionar</Button>
            </div>
            <Modal isOpen={tableIsOpen} onClose={() => handleCloseModal()}>
                <div className={styles.modalContent}>
                    <h2>Histórico de {history.name}</h2>
                    {history.data && <EventTable data={history.data} />}
                </div>
            </Modal>
            <Modal isOpen={formIsOpen} onClose={() => handleCloseFormModal()}>
                <HistoryForm 
                    petId={Pet.id!}
                    _setHistory={() => {setFormIsOpen(false)}} 
                    setnewpethistory={(historyItem: HistoryItem) => handleAddHistoryItem(historyItem)} 
                />
            </Modal>
        </div>
    );
};

export default HistoryFeatures;
