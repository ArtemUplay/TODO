import { ChangeEventHandler } from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';

export function TextField({
  label,
  placeholder,
  containerClassName = '',
  inputType,
  value,
  onChange,
  errorText,
  isInvalid,
}: TextFieldProps) {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);
  return (
    <div className={`mb-3 w-100 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={inputType}
        className={`form-control ${isInvalid}`}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
