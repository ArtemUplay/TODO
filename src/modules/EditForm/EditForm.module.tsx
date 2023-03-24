import { useState, MouseEvent } from 'react';
import { TextField, Checkbox } from 'components/index';

export const EditForm = () => {
  const [taskNameInputValue, setTaskNameInputValue] = useState<string>('');
  const [taskDescriptionInputValue, setTaskDescriptionInputValue] = useState<string>('');
  const [checkboxImportantChecked, setCheckboxImportantValue] = useState<boolean>(true);
  const [checkboxCompletedChecked, setCheckboxCompletedValue] = useState<boolean>(false);

  const onInputTaskName = (value: string) => {
    setTaskNameInputValue(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescriptionInputValue(value);
  };

  const onChangeImportantCheckboxValue = (value: boolean) => {
    setCheckboxImportantValue(!value);
  };

  const onChangeCompletedCheckboxValue = (value: boolean) => {
    setCheckboxCompletedValue(!value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log({
      taskNameInputValue,
      taskDescriptionInputValue,
      checkboxImportantChecked,
      checkboxCompletedChecked,
    });
  };

  return (
    <form className="edit-form d-flex flex-column align-items-center justify-content-center">
      <TextField inputType="text" label="Task name" placeholder="Clean room" onChange={onInputTaskName} />
      <TextField
        inputType="text"
        label={'Task description'}
        placeholder="Clean my room"
        onChange={onInputTaskDescription}
      />
      <Checkbox
        label="Important"
        checked={checkboxImportantChecked}
        onChange={() => onChangeImportantCheckboxValue(checkboxImportantChecked)}
      />
      <Checkbox
        label="Completed"
        checked={checkboxCompletedChecked}
        onChange={() => onChangeCompletedCheckboxValue(checkboxCompletedChecked)}
      />
      <button type="submit" className="btn btn-secondary d-block edit-task-button w-100" onClick={onSubmit}>
        Edit task
      </button>
    </form>
  );
};
