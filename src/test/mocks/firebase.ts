import { vi } from 'vitest';

// Mock Firebase App
export const mockFirebaseApp = {
  name: '[DEFAULT]',
  options: {},
  automaticDataCollectionEnabled: false,
};

// Mock Firestore
export const mockFirestore = {
  type: 'firestore',
  app: mockFirebaseApp,
};

// Mock Auth
export const mockAuth = {
  app: mockFirebaseApp,
  currentUser: null,
};

// Mock Firebase modules
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => mockFirebaseApp),
  getApp: vi.fn(() => mockFirebaseApp),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => mockFirestore),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}));
