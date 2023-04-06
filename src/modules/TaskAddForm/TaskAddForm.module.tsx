import { FormEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskFormStoreInstance } from './store/index';
import { validationSchema } from './TaskAddForm.schema';
import { TextField, Checkbox, Loader } from 'components/index';
import { ROOT } from 'constants/index';
import { TaskAddFormEntity } from 'domains/index';

const AddTaskFormProto = () => {
  const { isLoading, postNewTask } = AddTaskFormStoreInstance;
  const navigate = useNavigate();

  const defaultValues: TaskAddFormEntity = {
    taskName: '',
    taskDescription: '',
    checkboxImportant: false,
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onInputTaskName = useCallback((value: string) => {
    setValue('taskName', value);
  }, []);

  const onInputTaskDescription = useCallback((value: string) => {
    setValue('taskDescription', value);
  }, []);

  const onChangeImportantCheckboxValue = useCallback((isChecked: boolean) => {
    setValue('checkboxImportant', isChecked);
  }, []);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(async (data: TaskAddFormEntity) => {
      await postNewTask(data);
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
                label={'What to do(description)'}
                value={field.value}
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
            <Checkbox label="Important" checked={field.value} onChange={onChangeImportantCheckboxValue} />
          )}
        />

        <button type="submit" className="btn btn-secondary d-block edit-task-button w-100">
          Add task
        </button>
      </Loader>
    </form>
  );
};

export const AddTaskForm = observer(AddTaskFormProto);
