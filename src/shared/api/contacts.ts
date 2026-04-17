import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase/db';
import type { ContactMessageData } from './types/contacts.types';
import { withErrorHandling } from '../helpers/error-handling';

const COLLECTION = 'contacts';

export const createContactMessage = async (data: ContactMessageData) => {
  return withErrorHandling(async () => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...data,
    };
  });
};
