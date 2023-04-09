import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AddTaskButton = styled(Box)({
  display: 'block',
  width: '100%',
  backgroundColor: '#1976d2',
  padding: '10px 0px',
  borderRadius: '7px',
  textAlign: 'center',
  color: '#FFFFFF',
  ':hover': {
    color: '#fff',
  },
  textDecoration: 'none',
  fontWeight: '700',
});
