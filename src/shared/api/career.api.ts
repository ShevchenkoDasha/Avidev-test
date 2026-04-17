import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  type SnapshotOptions,
} from 'firebase/firestore';

import { db } from './firebase/db';
import { mapCareer, type CareersFirestore } from './mappers/career.mapper';
import type { CareerData, PartialCareerData } from './types/career.types';
import { withErrorHandling } from '../helpers/error-handling';

const COLLECTION = 'careers';

const careerConverter = {
  toFirestore(data: CareersFirestore): CareersFirestore {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): CareersFirestore {
    return snapshot.data(options) as CareersFirestore;
  },
};

const careersCollection = collection(db, COLLECTION).withConverter(
  careerConverter,
);

export const getCareers = async () => {
  return withErrorHandling(async () => {
    const snap = await getDocs(careersCollection);
    return snap.docs.map(mapCareer);
  });
};

export const createCareer = async (data: CareerData): Promise<string> => {
  return withErrorHandling(async () => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return docRef.id;
  });
};

export const updateCareer = async (
  id: string,
  data: PartialCareerData,
): Promise<void> => {
  return withErrorHandling(async () => {
    await updateDoc(doc(db, COLLECTION, id), data);
  });
};

export const deleteCareer = async (id: string): Promise<void> => {
  return withErrorHandling(async () => {
    await deleteDoc(doc(db, COLLECTION, id));
  });
};
