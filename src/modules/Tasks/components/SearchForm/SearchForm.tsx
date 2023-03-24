import { useState, MouseEvent } from 'react';

import './SearchForm.css';

import { StatusFilter } from '../StatusFilter/index';
import { SearchInput } from 'components/SearchInput';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';

export const SearchForm = () => {
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

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchValue('');
    setfilterType(FILTER_TYPES.ALL);
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput value={searchValue} onChange={onSearchInputChange} onReset={onResetInputValue} />
      <StatusFilter tasksType={filterType} onChange={onFilterChange} />
      <button type="button" className="btn btn-primary" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
};
