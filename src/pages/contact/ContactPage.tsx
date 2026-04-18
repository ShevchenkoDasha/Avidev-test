import { ContactForm } from '@/features/contact/ui/ContactForm';
import { ROUTES } from '@/shared/constants/routes';
import { useTranslation } from '@/shared/hooks';
import { Seo } from '@/shared/ui/seo/Seo';

const ContactPage = () => {
  const { translate, currentLang } = useTranslation();

  return (
    <>
      <Seo
        title={translate('seo.contact.title')}
        description={translate('seo.contact.description')}
        canonical={ROUTES.CONTACT}
        locale={currentLang}
      />
      <ContactForm />
    </>
  );
};

export default ContactPage;
