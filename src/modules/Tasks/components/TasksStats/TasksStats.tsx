import { observer } from 'mobx-react';
import { Box } from '@mui/system';
import { CircularProgress, Typography } from '@mui/material';
import { StyledContainer } from './TaskStats.styles';
import { TasksStoreInstance } from 'modules/Tasks/store/index';

export function TasksStatsProto() {
  const { tasksStats, isTasksLoading } = TasksStoreInstance;

  return (
    <StyledContainer>
      {tasksStats ? (
        <>
          <Box>
            {isTasksLoading ? <CircularProgress /> : <Typography variant="h6">Total: {tasksStats?.total}</Typography>}
          </Box>
          <Box>
            {isTasksLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h6">Important: {tasksStats?.important}</Typography>
            )}
          </Box>
          <Box>
            {isTasksLoading ? <CircularProgress /> : <Typography variant="h6">Done: {tasksStats?.done}</Typography>}
          </Box>
        </>
      ) : (
        <Typography variant="h5">Статы не найдены</Typography>
      )}
    </StyledContainer>
  );
}

export const TasksStats = observer(TasksStatsProto);
