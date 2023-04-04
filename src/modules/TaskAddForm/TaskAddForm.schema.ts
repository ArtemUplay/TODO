import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  taskName: Yup.string().required('Поле не может быть пустым'),
  taskDescription: Yup.string().required('Поле не может быть пустым'),
  checkboxImportant: Yup.bool(),
});
