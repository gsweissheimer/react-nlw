import React from 'react';
import styles from './form.module.css';

import HighlightText from 'components/highlightText/highlightText';

interface InputProps {
  label?: string;
  value: string;
  name?: string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, type = 'text', error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="input-container form-input-container">
      { label && <HighlightText type='headline' className='white-title'>{label}</HighlightText> }
      <input
        type={type}
        id={label}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
