import { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';

import './SearchForm.css';

import { StatusFilter } from '../StatusFilter/index';
import { SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store/index';

export const SearchFormProto = () => {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const [searchValue, setSearchValue] = useState<string>('');
  const [filterType, setfilterType] = useState<FiltersType>(FILTER_TYPES.ALL);

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const onResetInputValue = () => {
    setSearchValue('');
  };

  const onFilterChange = (type: FiltersType) => {
    setfilterType(type);
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    await loadTasks({
      searchValue,
      filterType,
    });
    setSearchValue('');
    setfilterType(FILTER_TYPES.ALL);
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput
        disabled={isTasksLoading}
        value={searchValue}
        onChange={onSearchInputChange}
        onReset={onResetInputValue}
      />
      <StatusFilter disabled={isTasksLoading} tasksType={filterType} onChange={onFilterChange} />
      <button type="button" className="btn btn-primary" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
};

export const SearchForm = observer(SearchFormProto);
