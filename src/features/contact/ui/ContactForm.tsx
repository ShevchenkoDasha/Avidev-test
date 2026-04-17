import { useLocation } from 'react-router-dom';
import { FormikProvider } from 'formik';

import { Button } from '@/shared/ui/button';
import {
  InputField,
  TextareaField,
  CheckboxField,
} from '@/shared/ui/form-controls';
import { Container } from '@/shared/ui/container';

import { useTranslation } from '@/shared/hooks';
import { useContactForm } from './hooks/useContactForm';

interface LocationState {
  jobTitle?: string;
}

export const ContactForm = () => {
  const { translate } = useTranslation();
  const location = useLocation();
  const state = location.state as LocationState;

  const { form } = useContactForm({ jobTitle: state?.jobTitle ?? '' });

  return (
    <Container>
      <h1 className="text-4xl font-semibold my-6 text-center">
        {translate('contact.title')}
      </h1>
      <FormikProvider value={form}>
        <form
          onSubmit={form.handleSubmit}
          className="flex flex-col space-y-6 max-w-2xl mx-auto"
          aria-label="Contact Form"
        >
          <InputField
            name="name"
            label={translate('contact.name')}
            errorTranslationKey={form.errors.name}
            required
          />
          <InputField
            name="email"
            label={translate('contact.email')}
            errorTranslationKey={form.errors.email}
            type="email"
            required
          />
          {state?.jobTitle ? (
            <InputField
              name="jobTitle"
              label={translate('contact.jobTitle')}
              readonly={true}
            />
          ) : null}
          <TextareaField name="message" label={translate('contact.message')} />
          <CheckboxField name="agree" label={translate('contact.agree')} />
          <Button
            type="submit"
            className="w-full py-3 text-lg"
            disabled={!form.isValid || !form.dirty || form.isSubmitting}
          >
            {translate('contact.send')}
          </Button>
        </form>
      </FormikProvider>
    </Container>
  );
};
