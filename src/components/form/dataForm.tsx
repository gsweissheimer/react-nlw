import React from 'react';

import HighlightText from 'components/highlightText/highlightText';

interface DatePickerProps {
  label: string;
  value: string;
  name?: string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, name, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="date-picker-container form-input-container">
      <HighlightText type='headline' className='white-title'>{label}</HighlightText>
      <input
        type="date"
        value={value}
        name={name}
        onChange={handleChange}
        className={`date-picker ${error ? 'date-picker-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default DatePicker;
