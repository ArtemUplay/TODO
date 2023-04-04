import { FiltersType } from 'domains/index';

export interface StatusFilterProps {
  disabled: boolean;
  tasksType: FiltersType;
  onChange: (tasksType: FiltersType) => void;
  isInvalid: string;
}
