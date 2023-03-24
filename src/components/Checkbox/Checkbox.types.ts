export interface CheckboxProps {
  label: string;
  checked: boolean;
  value: string;
  id: string;
  onChange: (value: boolean) => void;
  containerClassName?: string;
  disabled?: boolean;
}
