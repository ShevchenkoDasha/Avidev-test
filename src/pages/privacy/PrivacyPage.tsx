import { Container } from '@/shared/ui/container';
import { useTranslation } from '@/shared/hooks';

const PrivacyPage = () => {
  const { translate } = useTranslation();

  return (
    <main className="py-12">
      <Container maxWidth="md">
        <h1 className="text-3xl font-bold mb-6">
          {translate('privacy.title')}
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('privacy.introTitle')}
            </h2>
            <p>{translate('privacy.introText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('privacy.dataTitle')}
            </h2>
            <p>{translate('privacy.dataText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('privacy.usageTitle')}
            </h2>
            <p>{translate('privacy.usageText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('privacy.contactTitle')}
            </h2>
            <p>{translate('privacy.contactText')}</p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPage;
