import { TextField } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
import { memo } from 'react';

interface TextareaFieldProps {
  name: string;
  label: string;
  rows?: number;
}

export const TextareaField = memo(
  ({ name, label, rows = 4 }: TextareaFieldProps) => (
    <div className="mb-4">
      <Field
        as={TextField}
        fullWidth
        multiline
        rows={rows}
        name={name}
        label={label}
        variant="outlined"
        size="small"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  ),
);
