import { Hero } from '@/widgets/hero/ui/Hero';
import { ProjectsPreview } from '@/widgets/project-card/ui/ProjectsPreview';
import { Stats } from '@/widgets/stats/ui/Stats';

const MainPage = () => {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <ProjectsPreview />
    </div>
  );
};

export default MainPage;
