import { ChangeEventHandler, FormEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Checkbox, FormControlLabel, Box, CircularProgress } from '@mui/material';
import { AddTaskFormStoreInstance } from './store/index';
import { validationSchema } from './TaskAddForm.validation';
import { AddTaskButton } from './TaskAddForm.styles';
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

  const onInputTaskName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((evt) => {
    setValue('taskName', evt.target.value);
  }, []);

  const onInputTaskDescription: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((evt) => {
    setValue('taskDescription', evt.target.value);
  }, []);

  const onChangeImportantCheckboxValue: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    setValue('checkboxImportant', evt.target.checked);
  }, []);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(async (data: TaskAddFormEntity) => {
      await postNewTask(data);
      navigate(ROOT);
    })();
  };

  return (
    <Box component={'form'} display={'flex'} flexDirection={'column'} gap={'20px'} onSubmit={submitHandler}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Controller
            control={control}
            name="taskName"
            render={({ field, fieldState: { error } }) => (
              <TextField
                value={field.value}
                variant="standard"
                label="Task name"
                helperText={error?.message}
                placeholder="Clean room"
                onChange={onInputTaskName}
                error={error?.message ? true : false}
              />
            )}
          />
          <Controller
            control={control}
            name="taskDescription"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="What to do(description)"
                value={field.value}
                placeholder="Clean my room"
                variant="standard"
                onChange={onInputTaskDescription}
                helperText={error?.message}
                error={error?.message ? true : false}
              />
            )}
          />
          <Controller
            control={control}
            name="checkboxImportant"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={onChangeImportantCheckboxValue} />}
                label="Important"
              />
            )}
          />
          <AddTaskButton type="submit">Add task</AddTaskButton>
        </>
      )}
    </Box>
  );
};

export const AddTaskForm = observer(AddTaskFormProto);
