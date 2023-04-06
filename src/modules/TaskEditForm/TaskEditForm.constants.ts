import { TaskEditFormEntity } from 'domains/index';

export const defaultValues: TaskEditFormEntity = {
  name: '',
  info: '',
  isImportant: false,
  isCompleted: false,
};
