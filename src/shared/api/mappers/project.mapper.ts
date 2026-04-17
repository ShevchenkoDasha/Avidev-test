import { QueryDocumentSnapshot } from 'firebase/firestore';

export interface ProjectFirestore {
  translations?: Record<
    string,
    {
      title: string;
      description: string;
    }
  >;
  imageTitle: string;
  progress: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export const mapProjectContent = (
  doc: QueryDocumentSnapshot<ProjectFirestore>,
) => {
  const data = doc.data();

  return {
    id: doc.id,
    translations: data.translations ?? {},
    imageTitle: data.imageTitle ?? '',
    progress: data.progress,
    startDate: data.startDate,
    endDate: data.endDate,
    createdAt: data.createdAt,
  };
};
