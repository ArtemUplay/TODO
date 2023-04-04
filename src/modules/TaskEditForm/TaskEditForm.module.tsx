import { FormEvent, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ParamsType } from './TaskEditForm.types';
import { TaskEditFormStoreInstance } from './store';
import { validationSchema } from './TaskEditForm.shcema';
import { TextField, Checkbox, Loader } from 'components/index';
import { TasksMock } from '__mocks__/index';
import { ROOT } from 'constants/index';
import { TaskEditFormEntity, TaskEntity } from 'domains/index';

const TaskEditFormProto = () => {
  useEffect(() => {
    loadPage();
  }, []);

  const navigate = useNavigate();

  const data: TaskEntity = TasksMock[0];

  const defaultValues: TaskEditFormEntity = {
    taskName: data.name,
    taskDescription: data.info,
    checkboxImportant: data.isImportant,
    checkboxCompleted: data.isDone,
  };

  const { isLoading, loadPage, changeTaskImportance, changeTaskCompleted } = TaskEditFormStoreInstance;
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // Получаем id у таски
  const { taskId } = useParams<ParamsType>();
  if (!taskId) {
    return <div>Ошибка! Такой таски не существует</div>;
  }

  TaskEditFormStoreInstance.setTaskId = taskId;

  const onInputTaskName = useCallback((value: string) => {
    setValue('taskName', value);
  }, []);

  const onInputTaskDescription = useCallback((value: string) => {
    setValue('taskDescription', value);
  }, []);

  const onChangeImportantCheckboxValue = useCallback((isChecked: boolean) => {
    setValue('checkboxImportant', isChecked);
    changeTaskImportance(taskId, isChecked);
  }, []);

  const onChangeCompletedCheckboxValue = useCallback((isChecked: boolean) => {
    setValue('checkboxCompleted', isChecked);
    changeTaskCompleted(taskId, isChecked);
  }, []);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(async (data: TaskEditFormEntity) => {
      await loadPage();
      console.log(data);
      navigate(ROOT);
    })();
  };

  return (
    <form className="edit-form d-flex flex-column align-items-center justify-content-center" onSubmit={submitHandler}>
      <Loader isLoading={isLoading} variant="circle">
        <Controller
          control={control}
          name="taskName"
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                inputType="text"
                value={field.value}
                label="Task name"
                placeholder="Clean room"
                onChange={onInputTaskName}
                isInvalid={error?.message ? 'is-invalid' : ''}
              />
              <span className="text-danger align-self-start">{error?.message}</span>
            </>
          )}
        />

        <Controller
          control={control}
          name="taskDescription"
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                inputType="text"
                value={field.value}
                label={'What to do(description)'}
                placeholder="Clean my room"
                onChange={onInputTaskDescription}
                isInvalid={error?.message ? 'is-invalid' : ''}
              />
              <span className="text-danger align-self-start">{error?.message}</span>
            </>
          )}
        />
        <Controller
          control={control}
          name="checkboxImportant"
          render={({ field }) => (
            <Checkbox
              label="Important"
              checked={field.value}
              onChange={onChangeImportantCheckboxValue}
              disabled={watch('checkboxCompleted')}
            />
          )}
        />

        <Controller
          control={control}
          name="checkboxCompleted"
          render={({ field }) => (
            <Checkbox label="Completed" checked={field.value} onChange={onChangeCompletedCheckboxValue} />
          )}
        />

        <button type="submit" className="btn btn-secondary d-block edit-task-button w-100">
          Edit task
        </button>
      </Loader>
    </form>
  );
};

export const TaskEditForm = observer(TaskEditFormProto);
