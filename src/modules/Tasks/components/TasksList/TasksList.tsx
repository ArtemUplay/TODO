import { observer } from 'mobx-react';
import { Task } from '../Task/index';
import { TasksStoreInstance } from 'modules/Tasks/store/index';
import { Loader } from 'components/Loader';

export function TasksListProto() {
  const { isTasksLoading, tasks, changeTaskImportance, deleteTask, makeTaskCompleted } = TasksStoreInstance;

  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <Loader isLoading={isTasksLoading} variant="dot">
        {tasks?.length ? (
          <ul className="list-group todo-list mb-3 w-100">
            {tasks?.map((task) => (
              <li key={task.id} className="list-group-item">
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportance={changeTaskImportance}
                  deleteTask={deleteTask}
                  makeTaskCompleted={makeTaskCompleted}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Задачи не найдены</p>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
