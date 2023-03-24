import { TasksStats, TasksList } from './components';
import { SearchForm } from './components/SearchForm';
import { TasksMock, TasksStatsMock } from '__mocks__/index';

export function Tasks() {
  return (
    <>
      <SearchForm />
      <TasksStats {...TasksStatsMock} />
      <TasksList tasks={TasksMock} />
    </>
  );
}
