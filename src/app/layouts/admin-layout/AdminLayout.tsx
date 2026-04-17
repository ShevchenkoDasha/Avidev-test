import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CircularLoader } from '@/shared/ui/circular-loader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <Suspense fallback={<CircularLoader className="h-full" />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;
