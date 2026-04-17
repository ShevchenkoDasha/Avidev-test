import { FormikProvider } from 'formik';
import GoogleIcon from '@mui/icons-material/Google';
import { useCallback } from 'react';

import { InputField } from '@/shared/ui/form-controls';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';

import { useLoginForm } from '../hooks/useLoginForm';
import { useTranslation } from '@/shared/hooks';
import { useAppSelector } from '@/app/store/hooks';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useForgotPassword } from '../hooks/useForgotPassword';

export const AdminLoginForm = () => {
  const { loading } = useAppSelector((state: any) => state.auth);
  const { translate } = useTranslation();
  const { form } = useLoginForm();
  const { loadingGoogleLogin, handleLoginWithGoogle } = useGoogleLogin();
  const { handleForgotPassword } = useForgotPassword();

  const handleForgotPasswordCallback = useCallback(() => {
    handleForgotPassword(form.values.email);
  }, [handleForgotPassword, form.values.email]);

  return (
    <Container>
      <FormikProvider value={form}>
        <form
          onSubmit={form.handleSubmit}
          className="flex flex-col space-y-6 max-w-2xl mx-auto"
          aria-label="Contact Form"
        >
          <InputField
            name="email"
            label={translate('login.email')}
            errorTranslationKey={form.errors.email}
            required
          />
          <InputField
            name="password"
            label={translate('login.password')}
            errorTranslationKey={form.errors.password}
            type="password"
            required
          />
          <div className="flex justify-end -mt-2">
            <Button
              type="button"
              variant="text"
              onClick={handleForgotPasswordCallback}
              className="text-sm"
            >
              {translate('login.forgotPassword')}
            </Button>
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold">
            {loading ? translate('login.loading') : translate('login.login')}
          </Button>

          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-white/50">
              {' '}
              {translate('login.or')}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleLoginWithGoogle}
            className="w-full h-12 text-base font-medium"
          >
            <span className="flex items-center justify-center gap-3">
              <GoogleIcon className="w-5 h-5" />
              {loadingGoogleLogin
                ? translate('login.loading')
                : translate('login.continueWithGoogle')}
            </span>
          </Button>
        </form>
      </FormikProvider>
    </Container>
  );
};
