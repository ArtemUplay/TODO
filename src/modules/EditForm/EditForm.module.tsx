import { useState, MouseEvent } from 'react';
import { DescriptionInput } from './components/DescriptionInput';
import { TaskNameInput } from './components/TaskNameInput/TaskNameInput';
import { Checkbox } from 'components/index';

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
    setCheckboxImportantValue(value);
  };

  const onChangeCompletedCheckboxValue = (value: boolean) => {
    setCheckboxCompletedValue(value);
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
      <TaskNameInput onChange={onInputTaskName} value={taskNameInputValue} />
      <DescriptionInput onChange={onInputTaskDescription} value={taskDescriptionInputValue} />
      <Checkbox
        label="Important"
        checked={checkboxImportantChecked}
        value={'1'}
        id="Important"
        onChange={onChangeImportantCheckboxValue}
      />
      <Checkbox
        label="Completed"
        checked={checkboxCompletedChecked}
        value={'2'}
        id="Completed"
        onChange={onChangeCompletedCheckboxValue}
      />
      <button type="submit" className="btn btn-secondary d-block edit-task-button w-100" onClick={onSubmit}>
        Edit task
      </button>
    </form>
  );
};
