import { useEffect, useState } from 'react';
import Input from '../form/inputForm';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';
import Select from 'components/form/selectForm';
import { Pet, User } from 'types';
import Checkbox from 'components/form/checkBoxForm';
import DatePicker from 'components/form/dataForm';

import { usePet } from '../../hooks/usePet';

type PetFormProps = {
  user: User;
  pet?: Pet | null;
  className?: string;
  onclose?: () => void;
  setnewpet: (pet: Pet, tutorId: string) => void;
  _setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
};

type FormData = {
  id?: string;
  name: string;
  type: string;
  breedId: string;
  tutorId: string;
  birthDate: string;
  chip: boolean;
};

type Errors = {
  name?: string;
  type?: string;
  breedId?: string;
  tutorId?: string;
  birthDate?: string;
}

const PetForm = ({ user, className, onclose, setnewpet, _setPets, pet }: PetFormProps) => {

    const [formData, setFormData] = useState<FormData>({
      id: pet ? pet.id : "",
      name: pet ? pet.name : "",
      type: pet ? pet.type : "",
      breedId: pet ? pet.breedId : "",
      tutorId: pet ? pet.tutorId : "",
      birthDate: pet ? new Date(pet.birthDate).toISOString().split('T')[0] : "",
      chip: pet ? pet.microchip : false,
    });

    const { insertPet, updatePet } = usePet();

    const [types, setTypes] = useState<{ label: string; value: string }[]>([]);
    const [breeds, setBreeds] = useState<{ label: string; value: string }[]>([]);

  const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
      
      setTypes([{ label: 'Gato', value: 'cat' },{ label: 'Cachorro', value: 'dog' }])
      setBreeds([{ label: 'SRD', value: 'a76dd34c-a617-4292-8d0a-2491f2be1645' }])
    
    } , []);


    const validate = () => {
      const newErrors: typeof errors = {};
      if (!formData.name) newErrors.name = "Nome é obrigatório";
      if (!formData.type) newErrors.type = "Tipo é obrigatório";
      if (!formData.breedId) newErrors.breedId = "Raça é obrigatória";
      if (!formData.tutorId) newErrors.tutorId = "Tutor é obrigatório";
      if (!formData.birthDate) newErrors.birthDate = "Data de nascimento é obrigatória";
      return newErrors;
    };
  
    const handleInputChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const _method = pet ? updatePet : insertPet;

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const formPet: Pet = {
        id: formData.id,
        name: formData.name,
        type: formData.type,
        breedId: formData.breedId,
        tutorId: formData.tutorId,
        birthDate: formData.birthDate,
        microchip: formData.chip ?? false,
      };

      _method({pet: formPet}).then(() => {
        resetValues();
        if (onclose) onclose();
        setnewpet(formPet, formPet.tutorId)
        _setPets((prevPets: Pet[]) => [
          ...prevPets.filter((pet) => pet.tutorId !== formPet.tutorId),
          formPet,
        ]);
      }).catch(() => {
        alert('Erro ao cadastrar pet'); 
      })

    }

    const resetValues = () => {
      setFormData({
        name: "",
        type: "",
        breedId: "",
        tutorId: "",
        birthDate: "",
        chip: false,
      });
      setErrors({});
    }

  return (
    <>
        <HighlightText type='secondary' className='white-title'>Adicionar Pet</HighlightText>
        <form className={`pet-form form-container ${className}`} onSubmit={handleSubmit}>
            <Input
                name='id'
                value={formData.id ?? ""}
                onChange={handleInputChange}
                placeholder=""
                type='hidden'
                error={undefined}
            />
            <Input
                label="Nome"
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome"
                error={errors.name}
            />
            
            <div className='doubleInputLine'>
              <Select
                  label="Tipo"
                  name='type'
                  value={formData.type}
                  onChange={handleSelectChange}
                  options={types}
                  error={errors.type}
              />
              
              <Select
                  label="Raça"
                  name='breedId'
                  value={formData.breedId}
                  onChange={handleSelectChange}
                  options={breeds}
                  error={errors.breedId}
              />
            </div>
            
            <div className='doubleInputLine'>
            
              <Select
                  label="Tutor"
                  name='tutorId'
                  value={formData.tutorId}
                  onChange={handleSelectChange}
                  options={[{ label: user.name, value: user.tutorId }, { label: 'Débora Kantor', value: '2af27541-1ff6-4d5d-86d8-357fcb6e649d' }]}
                  error={errors.tutorId}
              />

              <DatePicker
                  label="Data de Nascimento"
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  error={errors.birthDate}
              />
            </div>
            <>
              <Checkbox
                  label="Pet possui chip!"
                  onChange={handleInputChange}
                  checked={formData.chip}
              />
            </>

            <HighlightText type='headline' className='redText'>Revise bem os dados, essa ação não pode ser desfeita</HighlightText>

            <Button type='primary' submitButton={true}>{pet ? "Editar" : "Adicionar"}</Button>
        </form>
    </>
  );
};

export default PetForm;
