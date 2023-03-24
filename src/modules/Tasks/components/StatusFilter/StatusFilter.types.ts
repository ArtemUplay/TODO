import { FiltersType } from 'domains/index';

export interface StatusFilterProps {
  tasksType: FiltersType;
  onChange: (tasksType: FiltersType) => void;
}
