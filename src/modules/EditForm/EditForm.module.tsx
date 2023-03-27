import { useState, MouseEvent } from 'react';
import { Data } from './EditForm.types';
import { TextField, Checkbox } from 'components/index';
import { TasksMock } from '__mocks__/index';

export const EditForm = () => {
  const data: Data = TasksMock[0];

  const [taskNameInputValue, setTaskNameInputValue] = useState<string>(data.name);
  const [taskDescriptionInputValue, setTaskDescriptionInputValue] = useState<string>(data.info);
  const [checkboxImportantChecked, setCheckboxImportantValue] = useState<boolean>(data.isImportant);
  const [checkboxCompletedChecked, setCheckboxCompletedValue] = useState<boolean>(data.isDone);

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
      <TextField
        inputType="text"
        value={taskNameInputValue}
        label="Task name"
        placeholder="Clean room"
        onChange={onInputTaskName}
      />
      <TextField
        inputType="text"
        value={taskDescriptionInputValue}
        label={'What to do(description)'}
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
