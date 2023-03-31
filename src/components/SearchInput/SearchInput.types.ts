/* eslint-disable no-unused-vars */
export interface SearchInputProps {
  disabled: boolean;
  onChange: (text: string) => void;
  value: string;
  onReset?: () => void;
}
