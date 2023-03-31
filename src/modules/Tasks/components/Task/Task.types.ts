import { TaskEntity } from 'domains/index';

export interface TaskProps {
  task: TaskEntity;
  changeTaskImportance: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  makeTaskCompleted: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
}
