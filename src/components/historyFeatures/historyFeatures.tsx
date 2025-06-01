import React from 'react';
import type { History, HistoryItem, Pet } from 'types';
import { FaPills, FaSyringe, FaBookMedical, FaFileMedical, FaBug, FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import styles from './historyFeatures.module.css';
import Button from 'components/button/button';
import Modal from 'components/modal/modal';
import { EventTable } from 'components/eventTable/eventTable';

interface HistoryFeaturesProps {
    Pet: Pet;
}
const HistoryFeatures: React.FC<HistoryFeaturesProps> = ({ Pet }) => {

    const [ isOpen, setIsOpen ] = React.useState(false);

    const [ history, setHistory ] = React.useState<History>({
        name: '',
        type: '',
        data: []
    });

    const handleOpenModal = (feature: string) => {
        console.log('feature', Pet);
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
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setHistory({
            name: '',
            type: '',
            data: []
        });
    }

    return (
        <div className={styles.featuresHistoryContent}>
            <div className={styles.historyFeatures}>
                <Button onclick={() => handleOpenModal('feature_doctor')} className={styles.featureHistory}><FaBookMedical /> Consultas</Button> 
                <Button onclick={() => handleOpenModal('feature_exam')} className={styles.featureHistory}><FaFileMedical /> Exames</Button>
                <Button onclick={() => handleOpenModal('feature_vaccines')} className={styles.featureHistory}><FaSyringe /> Vacinas</Button>
                <Button onclick={() => handleOpenModal('feature_meds')} className={styles.featureHistory}><FaPills /> Medicamentos</Button>
                <Button onclick={() => handleOpenModal('feature_erradicators')} className={styles.featureHistory}><FaBug /> Erradicadores</Button>
            </div>
            <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
                <div className={styles.modalContent}>
                    <h2>Histórico de {history.name}</h2>
                    {history.data && <EventTable data={history.data} />}
                </div>
            </Modal>
        </div>
    );
};

export default HistoryFeatures;