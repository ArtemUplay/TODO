import { TaskEntity } from 'domains/index';

export interface TaskProps {
  task: TaskEntity;
  changeTaskImportance: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  makeTaskCompleted: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
}

// Меняем название пропа isImportant на isimportant, так как React ругается на то, что это не валидный атрибут
export interface TaskNameProps {
  isdone: string;
  isimportant: string;
}

export interface TaskDescriptionProps {
  isdone: string;
  isimportant: string;
}

export interface ImportantButtonProps {
  isimportant: string;
}

export interface DoneButtonProps {
  isdone: string;
}
