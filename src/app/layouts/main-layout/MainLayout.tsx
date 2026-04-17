import { CircularLoader } from '@/shared/ui/circular-loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer/ui/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-white">
      <Header />
      <main className="flex-1 pt-[var(--header-height)]">
        <Suspense fallback={<CircularLoader className={'h-full'} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
MainLayout.displayName = 'MainLayout';

export default MainLayout;
