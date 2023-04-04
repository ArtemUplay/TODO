export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (isChecked: boolean) => void;
  containerClassName?: string;
  disabled?: boolean;
  value?: boolean;
}
