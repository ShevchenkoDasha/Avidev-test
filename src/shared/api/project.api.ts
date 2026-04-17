import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryDocumentSnapshot,
  type SnapshotOptions,
  getDoc,
} from 'firebase/firestore';

import { db } from './firebase/db';
import {
  mapProjectContent,
  type ProjectFirestore,
} from './mappers/project.mapper';
import type { ProjectData, PartialProjectData } from './types/project.types';
import { withErrorHandling } from '../helpers/error-handling';

const COLLECTION = 'projects';

const projectConverter = {
  toFirestore(data: ProjectFirestore): ProjectFirestore {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): ProjectFirestore {
    return snapshot.data(options) as ProjectFirestore;
  },
};

const projectsCollection = collection(db, COLLECTION).withConverter(
  projectConverter,
);

export const getProjectList = async () => {
  return withErrorHandling(async () => {
    const snap = await getDocs(projectsCollection);
    return snap.docs.map(mapProjectContent);
  });
};

export const getProjectById = async (id: string) => {
  return withErrorHandling(async () => {
    const docRef = doc(projectsCollection, id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      throw new Error('projectCart.notFound');
    }

    return mapProjectContent(snap);
  });
};

export const createProject = async (data: ProjectData): Promise<string> => {
  return withErrorHandling(async () => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return docRef.id;
  });
};

export const updateProject = async (
  id: string,
  data: PartialProjectData,
): Promise<void> => {
  return withErrorHandling(async () => {
    await updateDoc(doc(db, COLLECTION, id), data);
  });
};

export const deleteProject = async (id: string): Promise<void> => {
  return withErrorHandling(async () => {
    await deleteDoc(doc(db, COLLECTION, id));
  });
};
