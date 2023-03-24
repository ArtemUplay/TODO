import { MouseEvent } from 'react';
import { StatusFilterProps } from './StatusFilter.types';
import { CLASSNAMES } from './StatusFilter.constants';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';

export const StatusFilter = ({ onChange, tasksType }: StatusFilterProps) => {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    onChange(evt.target.textContent as FiltersType);
  };

  return (
    <div className="bnt-group" onClick={onFilterChange}>
      <button type="button" className={tasksType === FILTER_TYPES.ALL ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.ALL}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.ACTIVE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.ACTIVE}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.DONE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.DONE}
      </button>
      <button type="button" className={tasksType === FILTER_TYPES.IMPORTANT ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {FILTER_TYPES.IMPORTANT}
      </button>
    </div>
  );
};
