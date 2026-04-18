import { ROUTES } from '@/shared/constants/routes';
import { useTranslation } from '@/shared/hooks';
import { Seo } from '@/shared/ui/seo/Seo';
import { Hero } from '@/widgets/hero/ui/Hero';
import { ProjectsPreview } from '@/widgets/project-card/ui/ProjectsPreview';
import { Stats } from '@/widgets/stats/ui/Stats';

const MainPage = () => {
  const { translate, currentLang } = useTranslation();

  return (
    <>
      <Seo
        title={translate('seo.main.title')}
        description={translate('seo.main.description')}
        canonical={ROUTES.MAIN}
        locale={currentLang}
      />
      <div className="flex flex-col gap-0">
        <Hero />
        <Stats />
        <ProjectsPreview />
      </div>
    </>
  );
};

export default MainPage;
