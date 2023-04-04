import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  searchValue: Yup.string().required('Поле не может быть пустым'),
  filterType: Yup.string().required('Выберите фильтр поиска'),
});
