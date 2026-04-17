import { useTranslation } from '@/shared/hooks';
import { Container } from '@/shared/ui/container';

export const Stats = () => {
  const { translate } = useTranslation();

  return (
    <section className="py-12 bg-bg-secondary">
      <Container>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-2xl">1200+</h3>
            <p className="text-text-secondary">{translate('stats.drones')}</p>
          </div>
          <div>
            <h3 className="text-2xl">50+</h3>
            <p className="text-text-secondary">{translate('stats.missions')}</p>
          </div>
          <div>
            <h3 className="text-2xl">3000+</h3>
            <p className="text-text-secondary">
              {translate('stats.donations')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
