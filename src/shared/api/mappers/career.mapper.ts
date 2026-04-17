import { QueryDocumentSnapshot } from 'firebase/firestore';

export interface CareersFirestore {
  postedAt: string;
  translations?: Record<
    string,
    {
      title: string;
      location: string;
      description: string;
      department: string;
    }
  >;
}

export const mapCareer = (doc: QueryDocumentSnapshot<CareersFirestore>) => {
  const data = doc.data();

  return {
    id: doc.id,
    postedAt: data.postedAt,
    translations: data.translations || {},
  };
};
