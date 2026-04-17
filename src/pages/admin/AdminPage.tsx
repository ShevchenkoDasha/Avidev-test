import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';

import { useAppDispatch } from '@/app/store/store';
import { useTranslation } from '@/shared/hooks';

import { logout } from '@/features/auth/model/auth.thunks';
import { useCallback } from 'react';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslation();

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="py-20 bg-gradient-to-r from-black to-primary/30">
        <Container>
          <Button onClick={handleLogout}>{translate('logout.title')}</Button>
        </Container>
      </section>
    </div>
  );
};
export default AdminPage;
