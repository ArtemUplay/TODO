import { Box, Typography } from '@mui/material';
import { TaskEditForm } from 'modules/index';

export const TaskEditPage = () => {
  return (
    <Box width={'900px'} margin={'0 auto'}>
      <Typography variant="h2" component="h1" textAlign={'center'}>
        EDIT TASK
      </Typography>
      <TaskEditForm />
    </Box>
  );
};
