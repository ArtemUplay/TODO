import { PageContainer } from 'components/index';
import { TaskEditForm } from 'modules/index';

export const TaskEditPage = () => {
  return (
    <PageContainer>
      <h1 className="text-center">EDIT TASK</h1>
      <TaskEditForm />
    </PageContainer>
  );
};
