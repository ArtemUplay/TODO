import { useState, MouseEvent } from 'react';
import { FormData } from './AddTaskForm.types';
import { TextField, Checkbox } from 'components/index';

export const AddTaskForm = () => {
  const [taskNameInputValue, setTaskNameInputValue] = useState<string>('');
  const [taskDescriptionInputValue, setTaskDescriptionInputValue] = useState<string>('');
  const [checkboxImportantChecked, setCheckboxImportantValue] = useState<boolean>(false);

  const onInputTaskName = (value: string) => {
    setTaskNameInputValue(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescriptionInputValue(value);
  };

  const onChangeImportantCheckboxValue = (value: boolean) => {
    setCheckboxImportantValue(!value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log({
      taskNameInputValue,
      taskDescriptionInputValue,
      checkboxImportantChecked,
    });
  };

  return (
    <form className="edit-form d-flex flex-column align-items-center justify-content-center">
      <TextField
        inputType="text"
        value={taskNameInputValue}
        label="Task name"
        placeholder="Clean room"
        onChange={onInputTaskName}
      />
      <TextField
        inputType="text"
        label={'What to do(description)'}
        value={taskDescriptionInputValue}
        placeholder="Clean my room"
        onChange={onInputTaskDescription}
      />
      <Checkbox
        label="Important"
        checked={checkboxImportantChecked}
        onChange={() => onChangeImportantCheckboxValue(checkboxImportantChecked)}
      />
      <button type="submit" className="btn btn-secondary d-block edit-task-button w-100" onClick={onSubmit}>
        Add task
      </button>
    </form>
  );
};
