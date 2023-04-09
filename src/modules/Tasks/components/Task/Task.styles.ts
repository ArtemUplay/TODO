import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { TaskNameProps, TaskDescriptionProps, ImportantButtonProps, DoneButtonProps } from './Task.types';

export const ListItemWrapper = styled(Box)(() => ({
  border: '1px solid rgba(0,0,0,.125)',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const TaskName = styled(Typography)<TaskNameProps>(({ isdone, isimportant }) => ({
  fontSize: '18px',
  fontWeight: isimportant ? '700' : '',
  color: isdone == 'true' ? '#ccc' : isimportant ? 'rgb(25, 118, 210)' : '',
  textDecoration: isdone == 'true' ? 'line-through' : 'none',
}));

export const TaskDescription = styled(Typography)<TaskDescriptionProps>(({ isdone, isimportant }) => ({
  fontSize: '16px',
  fontWeight: isimportant ? '600' : '',
  color: isdone == 'true' ? '#ccc' : isimportant ? 'rgb(25, 118, 210)' : '',
  textDecoration: isdone == 'true' ? 'line-through' : 'none',
}));

export const ImportantButton = styled(Button)<ImportantButtonProps>(({ isimportant }) => ({
  backgroundColor: isimportant ? 'rgba(25, 118, 210, 0.7)' : 'transparent',
  minWidth: '0px',
  width: '35px',
  height: '35px',
  padding: '0px',
}));

export const DoneButton = styled(Button)<DoneButtonProps>(({ isdone }) => ({
  backgroundColor: isdone == 'true' ? 'rgba(25, 118, 210, 0.7)' : 'transparent',
  minWidth: '0px',
  width: '35px',
  height: '35px',
  padding: '0px',
}));

export const DeleteButton = styled(Button)({
  minWidth: '0px',
  width: '35px',
  height: '35px',
  padding: '0px',
});

export const EditButton = styled(Button)({
  minWidth: '0px',
  width: '35px',
  height: '35px',
  padding: '0px',
});
