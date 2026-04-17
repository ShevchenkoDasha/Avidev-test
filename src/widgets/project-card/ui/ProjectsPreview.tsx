import { Link } from 'react-router-dom';

import { ProjectCard } from '@/entities/project/ui';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { QueryStateRenderer } from '@/shared/ui/query-state-renderer/QueryStateRenderer';
import { QueryErrorFallback } from '@/shared/ui/query-error-fallback/QueryErrorFallback';
import { ROUTES } from '@/shared/constants/routes';
import { useTranslation } from '@/shared/hooks';
import { useProjects } from '@/entities/project';

import type { Project } from '@/shared/api/types/project.types';

export const ProjectsPreview = () => {
  const { translate, currentLang } = useTranslation();
  const { data, isLoading, isError, error } = useProjects();

  return (
    <section className="py-16 bg-bg-secondary">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-text-primary">
            {translate('projectPreview.title')}
          </h2>
          <Link to={ROUTES.PROJECTS} tabIndex={-1}>
            <Button variant="outline">
              {translate('projectPreview.viewAllButton')}
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <QueryStateRenderer
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            renderItem={(project: Project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.translations[currentLang].title}
                description={project.translations[currentLang].description}
                imageTitle={project.imageTitle}
                progress={project.progress}
              />
            )}
            errorFallback={(message) => (
              <QueryErrorFallback message={message} translate={translate} />
            )}
          />
        </div>
      </Container>
    </section>
  );
};
