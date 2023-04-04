import { FormEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './SearchForm.css';

import { StatusFilter } from '../StatusFilter/index';
import { validationSchema } from './SearchForm.schema';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType, SearchFormValidation } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store/index';

export const SearchFormProto = () => {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const defaultValues: SearchFormValidation = {
    searchValue: '',
    filterType: FILTER_TYPES.ALL,
  };

  const { handleSubmit, control, reset, setValue } = useForm<SearchFormValidation>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSearchChange = useCallback((value: string) => {
    setValue('searchValue', value);
  }, []);

  const onFilterTypeChange = useCallback((filterType: FiltersType) => {
    setValue('filterType', filterType);
  }, []);

  const onResetHandler = () => {
    setValue('searchValue', '');
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(async (data: SearchFormValidation) => {
      await loadTasks({
        searchValue: data.searchValue,
        filterType: data.filterType,
      });
      reset();
    })();
  };

  return (
    <form className="search-form d-flex justify-content-between" onSubmit={submitHandler}>
      <Controller
        control={control}
        name="searchValue"
        render={({ field, fieldState: { error } }) => (
          <div>
            <SearchInput
              disabled={isTasksLoading}
              value={field.value}
              onChange={onSearchChange}
              onReset={onResetHandler}
              isInvalid={error?.message ? 'is-invalid' : ''}
            />
            <div>{error?.message}</div>
          </div>
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field, fieldState: { error } }) => (
          <div>
            <StatusFilter
              disabled={isTasksLoading}
              tasksType={field.value}
              onChange={onFilterTypeChange}
              isInvalid={error?.message ? 'is-invalid' : ''}
            />
            <div>{error?.message}</div>
          </div>
        )}
      />
      <button type="submit" className="btn btn-primary">
        Find
      </button>
    </form>
  );
};

export const SearchForm = observer(SearchFormProto);
