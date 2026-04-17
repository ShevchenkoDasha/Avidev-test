import { Link } from 'react-router-dom';
import { memo } from 'react';

import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import { useTranslation } from '@/shared/hooks';

export const JobCard = memo(
  ({ title, description }: { title: string; description: string }) => {
    const { translate } = useTranslation();

    return (
      <div className="flex justify-between items-center bg-surface border border--border p-6 rounded-2xl hover:opacity-90 transition">
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>
        <Link to={ROUTES.CONTACT} state={{ jobTitle: title }} tabIndex={-1}>
          <Button variant="outline">{translate('careers.applyTitle')}</Button>
        </Link>
      </div>
    );
  },
);
