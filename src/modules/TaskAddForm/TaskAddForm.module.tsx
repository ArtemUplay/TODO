import { useState, FormEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { AddTaskFormStoreInstance } from './store/index';
import { TextField, Checkbox, Loader } from 'components/index';
import { ROOT } from 'constants/index';

const AddTaskFormProto = () => {
  const { isLoading, loadPage, changeTaskImportance } = AddTaskFormStoreInstance;
  const navigate = useNavigate();

  const [taskNameInputValue, setTaskNameInputValue] = useState<string>();
  const [taskDescriptionInputValue, setTaskDescriptionInputValue] = useState<string>('');
  const [checkboxImportantChecked, setCheckboxImportantChecked] = useState<boolean>(false);

  const onInputTaskName = (value: string) => {
    setTaskNameInputValue(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescriptionInputValue(value);
  };

  const onChangeImportantCheckboxValue = (value: boolean) => {
    setCheckboxImportantChecked(!value);
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await loadPage();
    console.log({
      taskNameInputValue,
      taskDescriptionInputValue,
      checkboxImportantChecked,
    });
    navigate(ROOT);
  };

  return (
    <form className="edit-form d-flex flex-column align-items-center justify-content-center" onSubmit={onSubmit}>
      <Loader isLoading={isLoading} variant="circle">
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
        <button type="submit" className="btn btn-secondary d-block edit-task-button w-100">
          Add task
        </button>
      </Loader>
    </form>
  );
};

export const AddTaskForm = observer(AddTaskFormProto);
