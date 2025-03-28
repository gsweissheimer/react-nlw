import React from 'react';
import style from './form.module.css';
import HighlightText from 'components/highlightText/highlightText';

interface CheckboxProps {
  label: string;
  checked: boolean;
    onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={`${style.checkboxContainer} ${style.formInputContainer}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={`checkbox ${error ? 'checkbox-error' : ''}`}
      />
      <label className={style.checkboxLabel}>
        <HighlightText type='headline' className={style.whiteTitle}>{label}</HighlightText>
      </label>
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  );
};

export default Checkbox;