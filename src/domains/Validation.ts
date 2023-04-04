import { FiltersType } from './Task.entity';

export interface SearchFormValidation {
  searchValue: string;
  filterType: FiltersType;
}
