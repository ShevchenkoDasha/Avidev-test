export interface Career {
  id: string;
  postedAt: string;
  translations: {
    [locale: string]: {
      title: string;
      location: string;
      description: string;
      department: string;
    };
  };
}

export type CareerData = Omit<Career, 'id'>;
export type PartialCareerData = Partial<CareerData>;
