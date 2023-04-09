import { Box, Typography } from '@mui/material';
import { AddTaskForm } from 'modules/index';

export const AddTaskPage = () => {
  return (
    <Box width={'900px'} margin={'0 auto'}>
      <Typography variant="h2" component="h1" textAlign={'center'}>
        Add task page
      </Typography>
      <AddTaskForm />
    </Box>
  );
};
