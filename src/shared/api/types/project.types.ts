export interface Project {
  id: string;
  imageTitle: string;
  progress: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  translations: {
    [locale: string]: {
      title: string;
      description: string;
      additionalInfo?: string;
    };
  };
}

export type ProjectData = Omit<Project, 'id'>;
export type PartialProjectData = Partial<ProjectData>;
