import { useEffect, useState, useContext } from 'react';
import Input from '../form/inputForm';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';
import Select from 'components/form/selectForm';
import { User, Event, EntityOption, EventActions, EventAction } from '../../types';
import DatePicker from 'components/form/dataForm';

import { useEventContext } from 'context/EventContext';
import { AuthContext } from 'context/AuthContext';

type EventFormProps = {
  className?: string;
  onclose?: () => void;
};

type FormData = {
  name: string;
  value: string;
  type: string;
  entityId: string;
  entityType: string;
  eventDate: string;
};

type Errors = {
  name: string;
  value: string;
  type: string;
  entityId: string;
  entityType: string;
  eventDate: string;
}

const EventForm = ({ className, onclose }: EventFormProps) => {

    const [formData, setFormData] = useState<FormData>({
      entityId: "",
      entityType: "",
      eventDate: new Date().toISOString().split('T')[0],
      name: "",
      value: "",
      type: "event",
    });

    const { insertEvent, SetEvents } = useEventContext();
    const { user } = useContext(AuthContext);

    const [entities, setEntities] = useState<EntityOption[]>([]);
    const [optionsDictionary, setOptionsDictionary] = useState<EventAction[]>([]);

  const [errors, setErrors] = useState<Errors | null>(null);

    useEffect(() => {
      
      setEntities(getEntitiesOptions(user));
    
    } , []);

    
    
    const getEntitiesOptions = (user: User): EntityOption[] => {
      const options: EntityOption[] = [];
      const optionsDictionary: EventAction[] = [];

      if (!user) return options;
    
      options.push({
        label: user.name,
        value: user.tutorId,
      });
    
      optionsDictionary.push({
        label: user.name,
        value: user.tutorId,
        entity: 'tutor',
      });
    
      if (user.pets && user.pets.length > 0) {
        user.pets.forEach(pet => {
           if (pet.id != null) {
              options.push({
                label: pet.name,
                value: pet.id,
              });
              optionsDictionary.push({
                label: pet.name,
                value: pet.id,
                entity: 'pet',
              });
            }
        });
      }
    
      if (user.family) {
        options.push({
          label: user.family.name,
          value: user.family.id,
        });
        optionsDictionary.push({
          label: user.family.name,
          value: user.family.id,
          entity: 'family',
        });
    
        if (user.family.users && user.family.users.length > 0) {
          user.family.users.forEach(familyUser => {
    
            if (familyUser.pets && familyUser.pets.length > 0) {
              familyUser.pets.forEach(pet => {
                if (pet.id != null) {
                   options.push({
                     label: pet.name,
                     value: pet.id,
                   });
                   optionsDictionary.push({
                     label: pet.name,
                     value: pet.id,
                     entity: 'pet',
                   });
                 }
              });
            }
          });
        }
      }
      setOptionsDictionary(optionsDictionary);
      return options;
    }

    const validate = () => {
      const newErrors: Errors = {
        entityId: !formData.entityId ? "Entidade é obrigatória" : "",
        entityType: !formData.entityType ? "Tipo de entidade é obrigatório" : "",
        eventDate: !formData.eventDate ? "Data do evento é obrigatória" : "",
        name: !formData.name ? "Nome é obrigatório" : "",
        value: !formData.value ? "Valor é obrigatório" : "",
        type: !formData.type ? "Tipo é obrigatório" : "",
      };
      return newErrors;
    };
  
    const handleInputChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.name === 'entityId') {
        formData.entityType = optionsDictionary.find(option => option.value === e.target.value)?.entity || '';
      }
      if (e.target.name === 'value') {
        formData.name = EventActions.find(action => action.value === e.target.value)?.label || '';
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // const validationErrors = validate();
      // if (Object.keys(validationErrors).length > 0) {
      //   setErrors(validationErrors);
      //   return;
      // }

      const formEvent: Event = {
        entityType: formData.entityType,
        entityId: formData.entityId,
        eventDate: formData.eventDate,
        value: formData.value,
        name: formData.name,
        type: formData.type,
      };

      console.log("formEvent", formEvent);

      insertEvent({event: formEvent}).then(() => {
        resetValues();
        if (onclose) onclose();
        SetEvents(prevEvents => [...(prevEvents || []), formEvent]);
        // _setEvent((prevPets: Pet[]) => [
        //   ...prevPets.filter((pet) => pet.tutorId !== formEvent.tutorId),
        //   formEvent,
        // ]);
      }).catch(() => {
        alert('Erro ao cadastrar pet'); 
      })

    }

    const resetValues = () => {
      setFormData({
        entityId: "",
        entityType: "",
        eventDate: new Date().toISOString(),
        name: "",
        value: "",
        type: "event",
      });
      setErrors(null);
    }

  return (
    <>
        <HighlightText type='secondary' className='white-title'>Adicionar Event</HighlightText>
        <form className={`event-form form-container ${className}`} onSubmit={handleSubmit}>
            
            <Input
                name='entityType'
                onChange={handleInputChange}
                type='hidden'
                value={formData.entityType}
            />
            
            <div className='doubleInputLine'>
            
            <Select
                label="Entidade"
                name='entityId'
                value={formData.entityId}
                onChange={handleSelectChange}
                options={entities}
                error={errors?.entityId}
            />
            
            <Select
                label="Nome"
                name='value'
                value={formData.value}
                onChange={handleSelectChange}
                options={EventActions}
                error={errors?.name}
            />
            
            <Input
                name='value'
                onChange={handleInputChange}
                type='hidden'
                value={formData.entityType}
            />

            </div>
            
            <div className='doubleInputLine'>
            
            <DatePicker
                  label="Data do Evento"
                  name='date'
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  error={errors?.eventDate}
              />

              </div>
              
              <br></br>

            <Button type='primary' submitButton={true}>{"Adicionar"}</Button>
        </form>
    </>
  );
};

export default EventForm;

