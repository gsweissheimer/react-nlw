import { useState } from 'react';
import "./petForm.css";
import Input from '../form/inputForm';
import Button from 'components/button/button';
import HighlightText from 'components/highlightText/highlightText';

type PetFormProps = {
  className?: string;
};

const PetForm = ({ className }: PetFormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
  
    const handleInputChange = (value: string) => {
      setInputValue(value);
      if (value.length < 3) {
        setError('O valor deve ter pelo menos 3 caracteres');
      } else {
        setError(undefined);
      }
    };
       
  return (
    <>
        <HighlightText type='secondary' className='white-title'>Adicionar Pet</HighlightText>
        <form className={`pet-form ${className}`}>
            <Input
                label="Nome"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Digite o nome"
                error={error}
            />
            
            <Input
                label="Tipo"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Digite o tipo"
                error={error}
            />

            <Button type='primary' submitButton={true}>Adicionar</Button>
        </form>
    </>
  );
};

export default PetForm;
