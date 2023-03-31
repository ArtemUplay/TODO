import { Route, Routes } from 'react-router-dom';
import { TaskEditPage, TasksPage, AddTaskPage } from 'pages/index';
import { PATH_LIST } from 'constants/paths';

export function Router() {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TasksPage />} />
      <Route path={PATH_LIST.EDIT} element={<TaskEditPage />} />
      <Route path={PATH_LIST.ADD} element={<AddTaskPage />} />
    </Routes>
  );
}
