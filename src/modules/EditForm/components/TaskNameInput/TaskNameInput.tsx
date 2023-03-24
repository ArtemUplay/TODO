import { ChangeEventHandler } from 'react';
import { TaskInpupProps } from './TaskNameInput.types';

export const TaskNameInput = ({ onChange }: TaskInpupProps) => {
  const onInputTaskName: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  return (
    <div className="text-field mb-3 w-100">
      <label htmlFor="Task name" className="form-label">
        Task name
      </label>
      <input type="text" className="form-control" id="Task name" placeholder="Clean room" onChange={onInputTaskName} />
    </div>
  );
};
