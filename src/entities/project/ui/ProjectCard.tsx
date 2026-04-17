import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { getProjectDetailsLink } from '@/app/router/navigation.helper';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageTitle: string;
  progress: number;
}

export const ProjectCard = memo(
  ({ id, title, description, imageTitle, progress }: ProjectCardProps) => {
    const { translate } = useTranslation();
    const navigate = useNavigate();

    const imageUrl = useMemo(() => `/images/${imageTitle}`, [imageTitle]);

    const onDetailsClick = useCallback(() => {
      navigate(getProjectDetailsLink(id));
    }, [navigate]);

    return (
      <Card>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-44 w-full object-cover rounded-t-md"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="p-4 flex flex-col flex-1 gap-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-text-secondary flex-1">{description}</p>
          <Progress value={progress} />
          <div className="mt-auto">
            <Button
              variant="outline"
              color="primary"
              onClick={onDetailsClick}
              className="w-full"
            >
              {translate('projectCart.detailsButton')}
            </Button>
          </div>
        </div>
      </Card>
    );
  },
);
