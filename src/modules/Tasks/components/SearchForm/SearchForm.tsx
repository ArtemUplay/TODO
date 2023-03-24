import { useState } from 'react';

import { SearchInput } from 'components/SearchInput';

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  return <SearchInput value={searchValue} onChange={onSearchInputChange} />;
};
