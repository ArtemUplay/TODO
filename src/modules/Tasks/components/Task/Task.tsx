import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskProps } from './Task.types';
import {
  ListItemWrapper,
  TaskName,
  TaskDescription,
  ImportantButton,
  DoneButton,
  DeleteButton,
  EditButton,
} from './Task.styles';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, changeTaskImportance, deleteTask, makeTaskCompleted }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnImportantClick = () => changeTaskImportance(id, isImportant);
  const onBtnDeleteClick = () => deleteTask(id);
  const onBtnCompleteClick = () => makeTaskCompleted(id, isDone);

  return (
    <ListItemWrapper>
      <Box display={'flex'} justifyContent={'space-between'} flexBasis={'100%'}>
        {/* React выкидывает предупреждение, что isImportant не является булевым значением, поэтому пришлось применить метод toString() */}
        <TaskName isdone={isDone.toString()} isimportant={isImportant.toString()}>
          {name}
        </TaskName>

        <Box display={'flex'} gap={'5px'}>
          <ImportantButton
            type="button"
            isimportant={isImportant.toString()}
            disabled={isDone}
            onClick={onBtnImportantClick}>
            <PriorityHighIcon />
          </ImportantButton>

          <DoneButton type="button" isdone={isDone.toString()} onClick={onBtnCompleteClick}>
            <CheckIcon />
          </DoneButton>

          <DeleteButton type="button" onClick={onBtnDeleteClick}>
            <DeleteIcon />
          </DeleteButton>

          <EditButton>
            <Link to={`${ROOT}${EDIT}/${id}`}>
              <EditIcon />
            </Link>
          </EditButton>
        </Box>
      </Box>
      <TaskDescription isdone={isDone.toString()} isimportant={isImportant.toString()}>
        {info}
      </TaskDescription>
    </ListItemWrapper>
  );
}
