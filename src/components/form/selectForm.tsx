import React from 'react';

import HighlightText from 'components/highlightText/highlightText';
import styles from './form.module.css';

interface SelectProps {
  label: string;
  value: string;
  name?: string;
  onChange:  (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, value, name, onChange, options, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
  };

  return (
    <div className="select-container form-input-container">
      <HighlightText type='headline' className='white-title'>{label}</HighlightText>
      <select
        name={name}
        id={label}
        value={value}
        onChange={handleChange}
        className={`select ${error ? 'select-error' : ''}`}
      >
        <option value="" disabled>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Select;
