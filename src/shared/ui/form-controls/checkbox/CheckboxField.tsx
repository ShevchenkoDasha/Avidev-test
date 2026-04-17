import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormikContext } from 'formik';
import { memo } from 'react';

interface CheckboxFieldProps {
  name: string;
  label: string;
}

export const CheckboxField = memo(({ name, label }: CheckboxFieldProps) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="mb-4">
      <FormControlLabel
        control={
          <Checkbox
            checked={values[name]}
            onChange={(e) => setFieldValue(name, e.target.checked)}
            color="primary"
          />
        }
        label={label}
      />
    </div>
  );
});
