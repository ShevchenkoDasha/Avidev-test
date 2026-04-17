import { useTranslation } from '@/shared/hooks';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';

export const Hero = () => {
  const { translate } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-r from-black to-primary/40">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl mb-6 font-bold">
            {translate('hero.title')}
          </h1>

          <p className="text-text-secondary mb-8">
            {translate('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>{translate('hero.supportButton')}</Button>
            <Button variant="outline">{translate('hero.detailsButton')}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
