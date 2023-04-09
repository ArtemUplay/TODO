import { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, IconButton, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { StatusFilter } from '../StatusFilter/index';
import { validationSchema } from './SearchForm.validation';
import { FormSearch } from './SearchForm.styles';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store/index';

export const SearchFormProto = () => {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const [submited, setSubmited] = useState<boolean>(false);

  const defaultValues: SearchFormEntity = {
    searchValue: '',
    filterType: FILTER_TYPES.ALL,
  };

  const { handleSubmit, control, setValue } = useForm<SearchFormEntity>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSearchChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((evt) => {
    setValue('searchValue', evt.target.value);
  }, []);

  const onFilterTypeChange = useCallback((filterType: FiltersType) => {
    setValue('filterType', filterType);
  }, []);

  const onResetHandler = () => {
    if (submited) {
      loadTasks({
        searchValue: '',
        filterType: 'All',
      });
    }

    setValue('searchValue', '');
  };

  const submitHandler = (evt: FormEvent<HTMLDivElement>) => {
    evt.preventDefault();
    handleSubmit(async (data: SearchFormEntity) => {
      await loadTasks({
        searchValue: data.searchValue,
        filterType: data.filterType,
      });
    })();

    setSubmited(true);
  };

  return (
    <FormSearch component={'form'} onSubmit={submitHandler}>
      <Controller
        control={control}
        name="searchValue"
        render={({ field, fieldState: { error } }) => (
          <TextField
            error={error?.message ? true : false}
            disabled={isTasksLoading}
            value={field.value}
            onChange={onSearchChange}
            onReset={onResetHandler}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => onResetHandler()}>
                  <Clear />
                </IconButton>
              ),
            }}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter disabled={isTasksLoading} tasksType={field.value} onChange={onFilterTypeChange} />
        )}
      />
      <Button type="submit" variant="contained">
        Find
      </Button>
    </FormSearch>
  );
};

export const SearchForm = observer(SearchFormProto);
