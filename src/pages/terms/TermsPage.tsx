import { Container } from '@/shared/ui/container';
import { useTranslation } from '@/shared/hooks';

const TermsPage = () => {
  const { translate } = useTranslation();

  return (
    <main className="py-12">
      <Container maxWidth="md">
        <h1 className="text-3xl font-bold mb-6">{translate('terms.title')}</h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('terms.introTitle')}
            </h2>
            <p>{translate('terms.introText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('terms.useTitle')}
            </h2>
            <p>{translate('terms.useText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('terms.liabilityTitle')}
            </h2>
            <p>{translate('terms.liabilityText')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              {translate('terms.changesTitle')}
            </h2>
            <p>{translate('terms.changesText')}</p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default TermsPage;
