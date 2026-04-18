import { Container } from '@/shared/ui/container';
import { ProjectCard } from '@/entities/project/ui/ProjectCard';
import { QueryStateRenderer } from '@/shared/ui/query-state-renderer/QueryStateRenderer';
import { QueryErrorFallback } from '@/shared/ui/query-error-fallback/QueryErrorFallback';
import type { Project } from '@/shared/api/types/project.types';
import { useTranslation } from '@/shared/hooks';
import { useProjects } from '@/entities/project/api/hooks';
import { Seo } from '@/shared/ui/seo/Seo';
import { ROUTES } from '@/shared/constants/routes';

const ProjectsPage = () => {
  const { translate, currentLang } = useTranslation();
  const { data, isLoading, isError, error } = useProjects();

  return (
    <>
      <Seo
        title={translate('seo.projects.title')}
        description={translate('seo.projects.description')}
        canonical={ROUTES.PROJECTS}
        locale={currentLang}
      />
      <Container>
        <h1 className="text-3xl my-6">{translate('projectPage.title')}</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
};

export default ProjectsPage;
