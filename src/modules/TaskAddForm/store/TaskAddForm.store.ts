import { action, computed, makeObservable, observable } from 'mobx';
import { TaskAddFormEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/agent/index';

type PrivateFields = '_isLoading';

class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,

      isLoading: computed,

      postNewTask: action,
    });
  }

  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  postNewTask = async (data: TaskAddFormEntity) => {
    this._isLoading = true;

    try {
      await TaskAgentInstance.postTask({
        isImportant: data.checkboxImportant,
        name: data.taskName,
        info: data.taskDescription,
      });
    } catch (error) {
      console.log('Ошибка:', error);
    } finally {
      this._isLoading = false;
    }
  };
}

export const AddTaskFormStoreInstance = new AddTaskFormStore();
