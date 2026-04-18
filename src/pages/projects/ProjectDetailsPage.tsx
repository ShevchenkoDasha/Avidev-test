import { useParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Button } from '@/shared/ui/button';
import { useTranslation } from '@/shared/hooks';
import { useProject } from '@/entities/project/api/hooks';
import { Seo } from '@/shared/ui/seo/Seo';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translate, currentLang } = useTranslation();
  const { data, isLoading, isError, error } = useProject(id);
  const handleNavigate = useCallback(() => navigate(-1), [navigate]);

  if (isLoading) return <div>{translate('projectCart.loading')}</div>;
  if (isError)
    return (
      <div>{translate(error?.message ?? 'notification.errors.unknown')}</div>
    );

  if (!data) {
    return (
      <div className="text-center mt-10">
        {translate('projectCart.notFound')}
      </div>
    );
  }

  return (
    <>
      <Seo
        title={data.translations[currentLang].title}
        description={data.translations[currentLang].description}
        canonical={`/projects/${data.id}`}
        locale={currentLang}
        image={`https://avidev-1125c.web.app${data.imageTitle}`}
      />
      <div className="max-w-3xl mx-auto p-6">
        <Button
          variant="outline"
          onClick={handleNavigate}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
        >
          <ArrowBackIcon fontSize="small" />
          {translate('common.back')}
        </Button>
        <img
          src={`/images/${data?.imageTitle}`}
          alt={data.translations[currentLang].title}
          className="w-full h-64 object-cover rounded-xl mb-4"
          loading="lazy"
          decoding="async"
        />
        <h1 className="text-3xl font-bold mb-4">
          {data.translations[currentLang].title}
        </h1>
        <p className="text-text-secondary mb-6">
          {data.translations[currentLang].description}
        </p>
        <div className="mb-4">
          <strong>{translate('projectCart.progress')}</strong> {data.progress}%
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
