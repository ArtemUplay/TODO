import { FormEvent, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ParamsType } from './TaskEditForm.types';
import { TaskEditFormStoreInstance } from './store';
import { validationSchema } from './TaskEditForm.shcema';
import { defaultValues } from './TaskEditForm.constants';
import { TextField, Checkbox, Loader } from 'components/index';
import { ROOT } from 'constants/index';
import { TaskEditFormEntity } from 'domains/index';

const TaskEditFormProto = () => {
  const { isLoading, editTask, taskForm } = TaskEditFormStoreInstance;
  const { handleSubmit, control, setValue, watch, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // Получаем id у таски
  const { taskId } = useParams<ParamsType>();

  useEffect(() => {
    TaskEditFormStoreInstance.taskId = taskId ?? null;
    if (TaskEditFormStoreInstance.taskId) TaskEditFormStoreInstance.getTask();
  }, []);

  useEffect(() => {
    if (taskForm) reset(taskForm);
  }, [taskForm]);

  const navigate = useNavigate();

  const onInputTaskName = useCallback((value: string) => {
    setValue('name', value);
  }, []);

  const onInputTaskDescription = useCallback((value: string) => {
    setValue('info', value);
  }, []);

  const onChangeImportantCheckboxValue = useCallback((isChecked: boolean) => {
    setValue('isImportant', isChecked);
  }, []);

  const onChangeCompletedCheckboxValue = useCallback((isChecked: boolean) => {
    setValue('isCompleted', isChecked);
  }, []);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(async (data: TaskEditFormEntity) => {
      await editTask(data);
      navigate(ROOT);
    })();
  };

  return (
    <form className="edit-form d-flex flex-column align-items-center justify-content-center" onSubmit={submitHandler}>
      <Loader isLoading={isLoading} variant="circle">
        {taskForm ? (
          <>
            <Controller
              control={control}
              name="name"
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
              name="info"
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
              name="isImportant"
              render={({ field }) => (
                <Checkbox
                  label="Important"
                  checked={field.value}
                  onChange={onChangeImportantCheckboxValue}
                  disabled={watch('isCompleted')}
                />
              )}
            />

            <Controller
              control={control}
              name="isCompleted"
              render={({ field }) => (
                <Checkbox label="Completed" checked={field.value} onChange={onChangeCompletedCheckboxValue} />
              )}
            />

            <button type="submit" className="btn btn-secondary d-block edit-task-button w-100">
              Edit task
            </button>
          </>
        ) : (
          <p>Not found</p>
        )}
      </Loader>
    </form>
  );
};

export const TaskEditForm = observer(TaskEditFormProto);
