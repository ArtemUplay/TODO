import { action, computed, makeObservable, observable } from 'mobx';
import { mapToInternalTaskEdit } from 'helpers/mappers';
import { TaskEditFormEntity } from 'domains/index';
import { fakeApi } from 'helpers/index';
import { TaskAgentInstance } from 'http/agent';

type PrivateFields = '_isLoading' | '_taskId' | '_taskForm';

class TaskEditFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _taskId: observable,
      _taskForm: observable,

      isLoading: computed,
      taskId: computed,
      taskForm: computed,

      editTask: action,
      getTask: action,
    });
  }

  private _isLoading = false;
  private _taskId: string | null = '0';

  get isLoading(): boolean {
    return this._isLoading;
  }

  get taskId(): string | null {
    return this._taskId;
  }

  set taskId(id: string | null) {
    this._taskId = id;
  }

  _taskForm: TaskEditFormEntity | null = {
    name: '',
    info: '',
    isCompleted: false,
    isImportant: false,
  };

  get taskForm(): TaskEditFormEntity | null {
    return this._taskForm;
  }

  set taskForm(value: TaskEditFormEntity | null) {
    this._taskForm = value;
  }

  getTask = async () => {
    this._isLoading = true;

    try {
      if (!this.taskId) throw new Error();
      const res = await TaskAgentInstance.getTask(this.taskId);
      this._taskForm = mapToInternalTaskEdit(res);
    } catch {
      this.taskForm = null;
    } finally {
      this._isLoading = false;
    }
  };

  editTask = async (task: TaskEditFormEntity): Promise<boolean> => {
    this._isLoading = true;
    try {
      if (!this.taskId) throw new Error();
      await TaskAgentInstance.updateTask(this.taskId, task);

      return true;
    } catch {
      return false;
    } finally {
      this._isLoading = false;
    }
  };
}

export const TaskEditFormStoreInstance = new TaskEditFormStore();
