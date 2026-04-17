import type { Project } from '@/shared/api/types/project.types';

export const PROJECTS: Project[] = [
  {
    id: 'delivery-drones',
    imageTitle: 'https://example.com/images/delivery-drone.jpg',
    progress: 45,
    startDate: '2026-02-01',
    endDate: '2026-06-01',
    createdAt: '2026-02-01T12:00:00Z',
    translations: {
      en: {
        title: 'Delivery Drones',
        description: 'Development of autonomous delivery drones',
      },
      ua: {
        title: 'Дрони доставки',
        description: 'Розробка автономних дронів доставки',
      },
    },
  },
  {
    id: 'recon-drones',
    imageTitle: 'https://example.com/images/recon-drone.jpg',
    progress: 60,
    startDate: '2026-01-15',
    endDate: '2026-05-15',
    createdAt: '2026-01-10T08:00:00Z',
    translations: {
      en: {
        title: 'Recon Drones',
        description: 'Surveillance drones for military operations',
      },
      ua: {
        title: 'Розвідувальні дрони',
        description: 'Розвідувальні дрони для військових операцій',
      },
    },
  },
];
