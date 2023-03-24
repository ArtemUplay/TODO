import { ChangeEventHandler } from 'react';
import { DescriptionInpupProps } from './DescriptionInput.types';

export const DescriptionInput = ({ onChange }: DescriptionInpupProps) => {
  const onInputTaskDescription: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  return (
    <div className="text-field mb-3 w-100">
      <label htmlFor="Description" className="form-label">
        What to do(description)
      </label>
      <input
        type="text"
        className="form-control"
        id="Description"
        placeholder="Clean my room"
        onChange={onInputTaskDescription}
      />
    </div>
  );
};
