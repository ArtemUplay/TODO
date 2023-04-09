import { FormEvent, useCallback, useEffect, ChangeEventHandler } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material';
import { ParamsType } from './TaskEditForm.types';
import { TaskEditFormStoreInstance } from './store';
import { validationSchema } from './TaskEditForm.validation';
import { defaultValues } from './TaskEditForm.constants';
import { EditTaskButton } from './TaskEditForm.styles';
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

  const onInputTaskName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((evt) => {
    setValue('name', evt.target.value);
  }, []);

  const onInputTaskDescription: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((evt) => {
    setValue('info', evt.target.value);
  }, []);

  const onChangeImportantCheckboxValue: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    setValue('isImportant', evt.target.checked);
  }, []);

  const onChangeCompletedCheckboxValue: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    setValue('isCompleted', evt.target.checked);
  }, []);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(async (data: TaskEditFormEntity) => {
      await editTask(data);
      navigate(ROOT);
    })();
  };

  return (
    <Box component={'form'} display={'flex'} flexDirection={'column'} gap={'20px'} onSubmit={submitHandler}>
      {isLoading ? (
        <CircularProgress />
      ) : taskForm ? (
        <>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                value={field.value}
                label="Task name"
                error={error?.message ? true : false}
                variant="standard"
                placeholder="Clean room"
                onChange={onInputTaskName}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => (
              <TextField
                value={field.value}
                error={error?.message ? true : false}
                label={'What to do(description)'}
                placeholder="Clean my room"
                variant="standard"
                onChange={onInputTaskDescription}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="isImportant"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={onChangeImportantCheckboxValue}
                    disabled={watch('isCompleted')}
                  />
                }
                label="Important"
              />
            )}
          />

          <Controller
            control={control}
            name="isCompleted"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={onChangeCompletedCheckboxValue} />}
                label="Completed"
              />
            )}
          />
          <EditTaskButton type="submit">Edit task</EditTaskButton>
        </>
      ) : (
        <Typography variant="h5">Not found</Typography>
      )}
    </Box>
  );
};

export const TaskEditForm = observer(TaskEditFormProto);
