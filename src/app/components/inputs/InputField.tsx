import React from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  margin?: 'none' | 'dense' | 'normal';
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
  fullWidth = true,
  variant = 'outlined',
  margin = 'normal',
  placeholder,
  helperText,
  error = false,
  required = false,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      fullWidth={fullWidth}
      variant={variant}
      margin={margin}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      InputProps={{ readOnly }}
    />
  );
};

export default InputField;
