import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Data, ParamsType } from './TaskEditForm.types';
import { TaskEditFormStoreInstance } from './store';
import { TextField, Checkbox, Loader } from 'components/index';
import { TasksMock } from '__mocks__/index';
import { ROOT } from 'constants/index';

const TaskEditFormProto = () => {
  useEffect(() => {
    loadPage();
  }, []);

  const navigate = useNavigate();

  const data: Data = TasksMock[0];
  const { isLoading, loadPage, changeTaskImportance, changeTaskCompleted } = TaskEditFormStoreInstance;

  // Получаем id у таски
  const { taskId } = useParams<ParamsType>();
  if (!taskId) {
    return <div>Ошибка! Такой таски не существует</div>;
  }

  TaskEditFormStoreInstance.setTaskId = taskId;

  const [taskNameInputValue, setTaskNameInputValue] = useState<string>(data.name);
  const [taskDescriptionInputValue, setTaskDescriptionInputValue] = useState<string>(data.info);
  const [checkboxImportantChecked, setCheckboxImportantChecked] = useState<boolean>(data.isImportant);
  const [checkboxCompletedChecked, setCheckboxCompletedChecked] = useState<boolean>(data.isDone);

  const onInputTaskName = (value: string) => {
    setTaskNameInputValue(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescriptionInputValue(value);
  };

  const onChangeImportantCheckboxValue = (value: boolean) => {
    setCheckboxImportantChecked(!value);
    changeTaskImportance(taskId, value);
  };

  const onChangeCompletedCheckboxValue = (value: boolean) => {
    setCheckboxCompletedChecked(!value);
    changeTaskCompleted(taskId, value);
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await loadPage();
    console.log({
      taskNameInputValue,
      taskDescriptionInputValue,
      checkboxImportantChecked,
      checkboxCompletedChecked,
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
        <button type="submit" className="btn btn-secondary d-block edit-task-button w-100">
          Edit task
        </button>
      </Loader>
    </form>
  );
};

export const TaskEditForm = observer(TaskEditFormProto);
