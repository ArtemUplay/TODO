import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { AddTaskButton } from './TasksPage.styles';
import { Tasks } from 'modules/index';
import { PATH_LIST } from 'constants/index';

export function TasksPage() {
  return (
    <Box width={'900px'} margin={'0 auto'}>
      <Typography variant="h2" component="h1" textAlign={'center'}>
        TODO LIST
      </Typography>
      <Tasks />

      <Link to={PATH_LIST.ADD} color="secondary">
        <AddTaskButton component={'a'}>Add task</AddTaskButton>
      </Link>
    </Box>
  );
}
