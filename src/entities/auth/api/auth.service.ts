import type { AdminUser } from '@/features/auth/model/auth.slice.types';
import { auth } from '@/shared/api/firebase/auth';
import { ALLOWED_EMAIL } from '@/shared/constants/auth';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { normalizeAuthFirebaseError } from '@/shared/lib/errors/normalize-auth-firebase-error';

export const loginAdminWithEmail = async (
  email: string,
  password: string,
): Promise<AdminUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    if (user.email?.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      await signOut(auth);
      throw new Error('notification.errors.noAdminPermissions');
    }

    return {
      id: user.uid,
      email: user.email ?? '',
    };
  } catch (error) {
    throw normalizeAuthFirebaseError(error);
  }
};

export const loginAdminWithGoogle = async (): Promise<AdminUser> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user.email?.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      await signOut(auth);
      throw new Error('notification.errors.noAdminPermissions');
    }

    return {
      id: user.uid,
      email: user.email ?? '',
    };
  } catch (error) {
    throw normalizeAuthFirebaseError(error);
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw normalizeAuthFirebaseError(error);
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  if (!email) {
    throw {
      code: 'empty-email',
      message: 'notification.errors.writeEmail',
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw normalizeAuthFirebaseError(error);
  }
};
