import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TasksStats, TasksList } from './components';
import { SearchForm } from './components/SearchForm';
import { TasksStoreInstance } from './store';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks();
  }, []);

  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
