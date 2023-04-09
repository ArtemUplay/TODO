import { MouseEvent, memo } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { StatusFilterProps } from './StatusFilter.types';
import { VARIANT } from './StatusFilter.constants';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';

const StatusFilterProto = ({ onChange, tasksType, disabled }: StatusFilterProps) => {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as FiltersType);
  };

  return (
    <ButtonGroup onClick={onFilterChange}>
      <Button type="button" variant={tasksType === FILTER_TYPES.ALL ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.ALL}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.ACTIVE ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.ACTIVE}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.DONE ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.DONE}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.IMPORTANT ? VARIANT.ACTIVE : VARIANT.SECONDARY}>
        {FILTER_TYPES.IMPORTANT}
      </Button>
    </ButtonGroup>
  );
};

export const StatusFilter = memo(StatusFilterProto);
