import React from 'react';

import HighlightText from 'components/highlightText/highlightText';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = 'text', error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <HighlightText type='headline' className='white-title'>{label}</HighlightText>
      <input
        type={type}
        id={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
