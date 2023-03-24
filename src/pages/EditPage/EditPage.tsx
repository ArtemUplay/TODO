import { PageContainer } from 'components/index';
import { EditForm } from 'modules/index';

export const EditPage = () => {
  return (
    <PageContainer>
      <h1 className="text-center">EDIT TASK</h1>
      <EditForm />
    </PageContainer>
  );
};
