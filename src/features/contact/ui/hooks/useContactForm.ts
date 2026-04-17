import { type FormikProps, useFormik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import { boolean, object, string } from 'yup';

import { useNotification } from '@/features/notification/hooks/useNotification';
import { useTranslation } from '@/shared/hooks';
import { createContactMessage } from '@/shared/api/contacts';
import type { AppError } from '@/shared/lib/errors/app-error.types';

interface ContactFormModel {
  form: FormikProps<ContactDataType>;
}

export interface ContactDataType {
  name: string;
  email: string;
  message: string;
  agree: false;
  jobTitle: string;
}

export const useContactForm = ({
  jobTitle,
}: {
  jobTitle: string;
}): ContactFormModel => {
  const { showError, showSuccess } = useNotification();
  const { translate } = useTranslation();

  const form = useFormik(
    getContactFormConfig({
      jobTitle,
      onSuccess: () => {
        showSuccess(translate('contact.submitSuccess'));
      },
      onError: (message) => {
        showError(translate(message));
      },
    }),
  );
  return { form };
};

const getContactFormConfig = ({
  jobTitle,
  onSuccess,
  onError,
}: {
  jobTitle: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}): FormikConfig<ContactDataType> => {
  return {
    initialValues: getInitialValues(jobTitle),
    validationSchema: validationContactSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await createContactMessage({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          agree: values.agree,
          jobTitle: values.jobTitle,
          createdAt: new Date().toISOString(),
          status: 'new',
        });

        resetForm();
        onSuccess();
      } catch (error) {
        const appError = error as AppError;
        onError(appError.message || 'contact.error.submitError');
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  };
};

const getInitialValues = (jobTitle: string): ContactDataType => {
  return {
    name: '',
    email: '',
    message: '',
    agree: false,
    jobTitle,
  };
};

const validationContactSchema = object().shape({
  name: string().required('validation.required'),
  email: string()
    .email('validation.invalid_email')
    .required('validation.required'),
  message: string(),
  agree: boolean().oneOf([true], 'validation.agree'),
});
