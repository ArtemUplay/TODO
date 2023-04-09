import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import { CircularProgress, List, Typography } from '@mui/material';
import { Task } from '../Task/index';
import { TasksStoreInstance } from 'modules/Tasks/store/index';

export function TasksListProto() {
  const { isTasksLoading, tasks, changeTaskImportance, deleteTask, makeTaskCompleted } = TasksStoreInstance;

  return (
    <Box>
      {isTasksLoading ? (
        <CircularProgress />
      ) : tasks?.length ? (
        <List component={'ul'}>
          {tasks?.map((task) => (
            <Task
              key={task.id}
              task={task}
              changeTaskImportance={changeTaskImportance}
              deleteTask={deleteTask}
              makeTaskCompleted={makeTaskCompleted}
            />
          ))}
        </List>
      ) : (
        <Typography variant="h5">Задачи не найдены</Typography>
      )}
    </Box>
  );
}

export const TasksList = observer(TasksListProto);
