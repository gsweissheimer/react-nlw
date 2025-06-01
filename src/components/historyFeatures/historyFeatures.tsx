import React from 'react';
import type { History, HistoryItem, Pet } from 'types';
import { FaPills, FaSyringe, FaBookMedical, FaFileMedical, FaBug, FaTrashAlt, FaRegEdit, FaHospital, FaPlus } from 'react-icons/fa';
import styles from './historyFeatures.module.css';
import Button from 'components/button/button';
import Modal from 'components/modal/modal';
import { EventTable } from 'components/eventTable/eventTable';
import HistoryForm from 'components/historyForm/historyForm';

interface HistoryFeaturesProps {
    Pet: Pet;
}
const HistoryFeatures: React.FC<HistoryFeaturesProps> = ({ Pet }) => {

    const [ tableIsOpen, setTableIsOpen ] = React.useState(false);
    const [ formIsOpen, setFormIsOpen ] = React.useState(false);

    const [ history, setHistory ] = React.useState<History>({
        name: '',
        type: '',
        data: []
    });

    const handleOpenFormModal = () => {
        setFormIsOpen(true)
    }

    const handleCloseFormModal = () => {
        setFormIsOpen(false)
    }

    const handleAddHistoryItem = (historyItem: HistoryItem) => {
        Pet.history = [...Pet.history || [], historyItem];
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
                            <Button type='icon' className={styles.closeButton} onclick={() => alert('Excluir')}>
                                <FaTrashAlt />
                            </Button>
                            <Button type='icon' className={styles.closeButton} onclick={() => alert('Editar')}>
                                <FaRegEdit />
                            </Button>
                        </>,
        })) || [];
        setHistory({
            name: feature.replace('feature_', '').replace('_', ' ').toLocaleUpperCase(),
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