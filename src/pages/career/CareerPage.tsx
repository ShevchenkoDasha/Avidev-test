import { Link } from 'react-router-dom';
import { useCallback } from 'react';

import { JobCard } from '@/entities/career/ui';
import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { QueryStateRenderer } from '@/shared/ui/query-state-renderer/QueryStateRenderer';
import { QueryErrorFallback } from '@/shared/ui/query-error-fallback/QueryErrorFallback';
import { ROUTES } from '@/shared/constants/routes';
import { useCareer } from '@/entities/career/api/hooks';
import type { Career } from '@/shared/api/types/career.types';
import { useTranslation } from '@/shared/hooks';
import { Seo } from '@/shared/ui/seo/Seo';

const reasons = [
  'career.reasons.real_tasks',
  'career.reasons.strong_team',
  'career.reasons.fast_growth',
];

export const CareerPage = () => {
  const { data, isLoading, isError, error } = useCareer();
  const { translate, currentLang } = useTranslation();

  const handleSendClick = useCallback(
    () => (window.location.href = 'mailto:test@gmail.com?subject=CV'),
    [],
  );

  return (
    <>
      <Seo
        title={translate('seo.career.title')}
        description={translate('seo.career.description')}
        canonical={ROUTES.CAREER}
        locale={currentLang}
      />
      <div className="flex flex-col gap-16 pb-16">
        <section className="py-20 bg-gradient-to-r from-black to-primary/30">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {translate('career.hero.title')}
              </h1>
              <p className="text-text-secondary mb-8">
                {translate('career.hero.description')}
              </p>
              <Button onClick={handleSendClick}>
                {translate('career.hero.send_cv')}
              </Button>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <h2 className="text-2xl font-semibold mb-8">
              {translate('career.reasons.title')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {reasons.map((key) => (
                <div
                  key={key}
                  className="bg-surface border border-border p-6 rounded-2xl"
                >
                  {translate(key)}
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <h2 className="text-2xl font-semibold mb-8">
              {translate('career.open_positions.title')}
            </h2>
            <div className="flex flex-col gap-4">
              <QueryStateRenderer
                data={data}
                isLoading={isLoading}
                isError={isError}
                error={error}
                renderItem={(job: Career) => (
                  <JobCard
                    key={job.id}
                    title={job.translations[currentLang].title}
                    description={job.translations[currentLang].description}
                  />
                )}
                errorFallback={(message) => (
                  <QueryErrorFallback message={message} translate={translate} />
                )}
              />
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <div className="bg-surface border border-border p-8 rounded-2xl text-center">
              <h3 className="text-xl mb-4">
                {translate('career.contact.title')}
              </h3>
              <p className="text-text-secondary mb-6">
                {translate('career.contact.description')}
              </p>
              <Link to={ROUTES.CONTACT} tabIndex={-1}>
                <Button>{translate('career.contact.button')}</Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default CareerPage;
