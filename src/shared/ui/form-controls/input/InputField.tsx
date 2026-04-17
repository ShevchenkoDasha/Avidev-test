import { TextField } from '@mui/material';
import { Field } from 'formik';
import clsx from 'clsx';
import { memo } from 'react';

import { useTranslation } from '@/shared/hooks';

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  className?: string;
  required?: boolean;
  readonly?: boolean;
  errorTranslationKey?: string;
}

export const InputField = memo(
  ({
    name,
    label,
    type = 'text',
    className,
    required,
    readonly,
    errorTranslationKey,
  }: InputFieldProps) => {
    const { translate } = useTranslation();

    return (
      <div className={clsx('mb-4', className)}>
        <Field
          as={TextField}
          fullWidth
          name={name}
          label={label}
          required={required}
          variant="outlined"
          type={type}
          InputProps={{
            readOnly: readonly,
          }}
          size="small"
          helperText={
            errorTranslationKey ? (
              <span className="text-red-600">
                {translate(errorTranslationKey)}
              </span>
            ) : null
          }
        />
      </div>
    );
  },
);
