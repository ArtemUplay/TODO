import { action, computed, makeObservable, observable } from 'mobx';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/agent/index';
import { getInternalInfo, mapToExternalParams, mapToInternalTasks } from 'helpers/mappers';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading' | '_searchForm';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,
      _searchForm: observable,

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

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  private _searchForm?: SearchFormEntity = {
    searchValue: '',
    filterType: 'All',
  };

  getTasks = async (searchParams?: SearchFormEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);
    return {
      tasks: mapToInternalTasks(res),
      tasksStats: getInternalInfo(res),
    };
  };

  loadTasks = async (searchParams?: SearchFormEntity) => {
    this._isTasksLoading = true;
    try {
      if (searchParams) this._searchForm = searchParams;

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
  };

  changeTaskImportance = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
  };

  makeTaskCompleted = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? currentStatus : undefined,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;

    try {
      await TaskAgentInstance.deleteTask(taskId);
      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
  };
}

export const TasksStoreInstance = new TasksStore();
