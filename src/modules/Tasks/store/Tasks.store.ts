import { action, computed, makeObservable, observable } from 'mobx';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
import { fakeApi } from 'helpers/index';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,

      tasks: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportance: action,
      deleteTask: action,
      makeTaskCompleted: action,
    });
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity {
    return this._tasksStats;
  }

  loadTasks = async (searchParams?: SearchFormEntity) => {
    try {
      this._isTasksLoading = true;

      await fakeApi(1000);

      console.log(searchParams);

      this._tasks = TasksMock;
      this._tasksStats = TasksStatsMock;
    } catch {
      console.log('Ошибка');
    } finally {
      this._isTasksLoading = false;
    }
  };

  changeTaskImportance = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;

    console.log('important', taskId, !currentStatus);

    this.loadTasks();
  };

  makeTaskCompleted = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;

    console.log('complete', taskId, !currentStatus);

    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;

    console.log('delete', taskId);

    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
