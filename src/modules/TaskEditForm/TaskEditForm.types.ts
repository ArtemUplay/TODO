// export interface FormData {
//   taskNameInputValue: string;
//   taskDescriptionInputValue: string;
//   checkboxImportantChecked: boolean;
//   checkboxCompletedChecked: boolean;
// }

export interface Data {
  name: string;
  id: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export type ParamsType = {
  taskId: string;
};
