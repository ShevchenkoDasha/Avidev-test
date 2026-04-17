import { AdminLoginForm } from '@/features/auth/ui/AdminLoginForm';

import { useTranslation } from '@/shared/hooks';

const AdminLoginPage = () => {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col align-center justify-center bg-bg-primary text-white">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
        {translate('admin.title')}
      </h1>
      <div className="w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10 shadow-xl">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
