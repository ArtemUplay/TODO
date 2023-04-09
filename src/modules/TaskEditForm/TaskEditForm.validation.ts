import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Поле не может быть пустым'),
  info: Yup.string().required('Поле не может быть пустым'),
  isImportant: Yup.bool(),
  isCompleted: Yup.bool(),
});
