import React from 'react';
import './form.css';
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
    <div className="checkbox-container form-input-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={`checkbox ${error ? 'checkbox-error' : ''}`}
      />
      <label className="checkbox-label">
        <HighlightText type='headline' className='white-title'>{label}</HighlightText>
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Checkbox;