import { useEffect, useState } from 'react';
import Input from '../form/inputForm';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';
import Select from 'components/form/selectForm';
import { HistoryItem } from 'types';
import DatePicker from 'components/form/dataForm';
import styles from './historyForm.module.css';

import { usePetHistory } from '../../hooks/usePetHistory';

export type FormData = {
  id?: string;
  eventDate: string;
  petId?: string;
  eventType: string;
  eventTypeLabel: string;
  name: string;
};


type HistoryFormProps = {
  petId: string;
  formData?: FormData
  className?: string;
  onclose?: () => void;
  setnewpethistory: (historyItem: HistoryItem) => void;
  _setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
};

type EventTypeOption = { value: string; label: string };

type Errors = {
  eventDate?: string;
  petId?: string;
  eventType?: string;
  eventTypeLabel?: string;
  name?: string;
}

const HistoryForm = ({ className, onclose, setnewpethistory, _setHistory, petId, formData }: HistoryFormProps) => {

  const [formDataState, setFormDataState] = useState<FormData>(formData || {} as FormData);

  const { insertHistoryItem, updateHistoryItem } = usePetHistory();

  const [errors, setErrors] = useState<Errors>({});

  const EventTypeOptions: EventTypeOption[] = [
    { value: 'feature_doctor', label: 'Médico' },
    { value: 'feature_exam', label: 'Exame' },
    { value: 'feature_vaccines', label: 'Vacina' },
    { value: 'feature_meds', label: 'Remédio' },
    { value: 'feature_erradicators', label: 'Erradicadores' },
    { value: 'feature_surgery', label: 'Cirurgias' },
  ];

  const validate = () => {
    const newErrors: Errors = {};
    if (!formDataState.name) newErrors.name = "Nome é obrigatório";
    if (!formDataState.eventDate) newErrors.eventDate = "Data do evento é obrigatória";
    if (!formDataState.petId) newErrors.petId = "Pet é obrigatório";
    if (!formDataState.eventType) newErrors.eventType = "Tipo de evento é obrigatório";
    if (!formDataState.eventTypeLabel) newErrors.eventTypeLabel = "Tipo de evento é obrigatório";
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'eventType') {
      const selectedOption = EventTypeOptions.find(option => option.value === e.target.value);
      if (selectedOption) {
        setFormDataState({ 
          ...formDataState, 
          eventTypeLabel: selectedOption.label, 
          eventType: selectedOption.value 
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    formDataState.petId = petId;
    
    const _method = formDataState ? updateHistoryItem : insertHistoryItem;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData: FormData = {
      id: formDataState.id,
      eventDate: formDataState.eventDate,
      petId: formDataState.petId,
      eventType: formDataState.eventType,
      eventTypeLabel: formDataState.eventTypeLabel,
      name: formDataState.name,
    };

    _method({ historyItem: formData, callback: () => {} }).then(() => {
      resetValues();
      if (onclose) onclose();
      setnewpethistory(formData)
      _setHistory((prevHistoryItem: HistoryItem[]) => [
        ...prevHistoryItem.filter((historyItem) => historyItem.petId !== formDataState.petId),
        formData,
      ]);
    }).catch(() => {
      alert('Erro ao cadastrar pet');
    })

  }

  const resetValues = () => {
    setFormDataState({} as FormData);
    setErrors({} as Errors);
  }

  return (
    <div className={styles.historyFormContent}>
      <HighlightText type='secondary' className='white-title'>Adicionar Pet</HighlightText>
      <form className={`pet-form form-container ${className}`} onSubmit={handleSubmit}>
        <Input
          name='id'
          value={formDataState.id ?? ""}
          onChange={handleInputChange}
          placeholder=""
          type='hidden'
          error={undefined}
        />
        <Input
          label="Nome"
          name='name'
          value={formDataState.name}
          onChange={handleInputChange}
          placeholder="Digite o nome"
          error={errors.name}
        />

        <div className='doubleInputLine'>
          <Input
            type='hidden'
            name='petId'
            value={formDataState.petId!}
            onChange={handleInputChange}
            error={errors.petId}
          />

          <Select
            label="Tipo de Histórico"
            name='eventType'
            value={formDataState.eventType ?? ""}
            onChange={handleSelectChange}
            options={EventTypeOptions}
            error={errors.eventType}
          />
        </div>

        <div className='doubleInputLine'>

          <DatePicker
            label="Data do Evento"
            name='eventDate'
            inputType='datetime-local'
            value={formDataState.eventDate || ""}
            onChange={handleInputChange}
            error={errors.eventDate}
          />
        </div>

        <Button type='primary' submitButton={true}>{formData ? "Editar" : "Adicionar"}</Button>
      </form>
    </div>
  );
};

export default HistoryForm;
