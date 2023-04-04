import { action, computed, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { fakeApi } from 'helpers/index';

type PrivateFields = '_isLoading' | '_taskId';

class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _taskId: observable,

      isLoading: computed,
      taskId: computed,

      changeTaskImportance: action,
    });
  }

  private _isLoading = false;
  private _taskId = '0';

  get isLoading(): boolean {
    return this._isLoading;
  }

  get taskId(): string {
    return this._taskId;
  }

  set taskId(id) {
    this._taskId = id;
  }

  //
  changeTaskImportance(taskId: TaskEntity['id'], currentStatus: boolean) {
    console.log('important', taskId, !currentStatus);
  }

  loadPage = async () => {
    try {
      this._isLoading = true;

      await fakeApi(1000);
    } catch {
      console.log('Ошибка');
    } finally {
      this._isLoading = false;
    }
  };
}

export const AddTaskFormStoreInstance = new AddTaskFormStore();