import { type FormikProps, useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@/shared/hooks';
import { useAppDispatch } from '@/app/store/hooks';
import type { AppError } from '@/shared/lib/errors/app-error.types';
import { loginWithEmail } from '../model/auth.thunks';
import { ROUTES } from '@/shared/constants/routes';
import { useNotification } from '@/features/notification/hooks/useNotification';

interface LoginFormData {
  form: FormikProps<LoginDataType>;
}

export interface LoginDataType {
  email: string;
  password: string;
}

export const useLoginForm = (): LoginFormData => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const { showError, showSuccess } = useNotification();

  const form = useFormik<LoginDataType>({
    initialValues: getInitialValues(),
    validationSchema: validationLoginSchema,
    enableReinitialize: true,
    onSubmit: async ({ email, password }) => {
      try {
        await dispatch(loginWithEmail({ email, password })).unwrap();

        showSuccess(translate('notification.successfulLogin'));

        navigate(ROUTES.ADMIN);
      } catch (error) {
        const appError = error as AppError;

        showError(translate(appError.message));
      }
    },
  });

  return { form };
};

const getInitialValues = (): LoginDataType => {
  return {
    email: '',
    password: '',
  };
};

const validationLoginSchema = object().shape({
  email: string()
    .email('validation.invalid_email')
    .required('validation.required'),
  password: string()
    .min(6, 'validation.password_min')
    .matches(/[A-Z]/, 'validation.password_uppercase')
    .matches(/[a-z]/, 'validation.password_lowercase')
    .matches(/[0-9]/, 'validation.password_number')
    .required('validation.required'),
});
