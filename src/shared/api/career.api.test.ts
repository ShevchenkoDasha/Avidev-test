import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} from './career.api';

import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  //   getFirestore,
} from 'firebase/firestore';
import { mapCareer } from './mappers/career.mapper';

vi.mock('firebase/firestore', () => ({
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  collection: vi.fn(() => ({
    withConverter: vi.fn(() => 'mocked-careers-collection'),
  })),
  //   getFirestore: vi.fn(),
}));

vi.mock('./mappers/career.mapper', () => ({
  mapCareer: vi.fn(),
}));

vi.mock('../helpers/error-handling', () => ({
  withErrorHandling: (cb: () => unknown) => cb(),
}));

vi.mock('./firebase/db', () => ({
  db: {},
}));

describe('career service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getCareers loads docs and maps them', async () => {
    const mockDocs = [{ id: '1' }, { id: '2' }];
    const mapped1 = { id: '1', title: 'Dev' };
    const mapped2 = { id: '2', title: 'QA' };

    vi.mocked(getDocs).mockResolvedValue({
      docs: mockDocs,
    } as any);

    vi.mocked(mapCareer)
      .mockReturnValueOnce(mapped1 as any)
      .mockReturnValueOnce(mapped2 as any);

    const result = await getCareers();

    expect(getDocs).toHaveBeenCalled();
    expect(mapCareer).toHaveBeenCalledTimes(2);
    expect(mapCareer).toHaveBeenNthCalledWith(1, mockDocs[0], 0, mockDocs);
    expect(mapCareer).toHaveBeenNthCalledWith(2, mockDocs[1], 1, mockDocs);
    expect(result).toEqual([mapped1, mapped2]);
  });

  it('createCareer creates document and returns id', async () => {
    const mockCollectionRef = { path: 'careers' };
    const mockDocRef = { id: 'career-123' };

    vi.mocked(collection).mockReturnValue(mockCollectionRef as any);
    vi.mocked(addDoc).mockResolvedValue(mockDocRef as any);

    const data = {
      translations: {
        en: { title: 'Engineer', description: 'Build stuff' },
      },
    } as any;

    const result = await createCareer(data);

    expect(collection).toHaveBeenCalled();
    expect(addDoc).toHaveBeenCalledWith(
      mockCollectionRef,
      expect.objectContaining({
        ...data,
        createdAt: expect.any(String),
      }),
    );
    expect(result).toBe('career-123');
  });

  it('updateCareer updates document', async () => {
    const mockDocRef = { id: 'career-1' };
    const patch = {
      translations: {
        en: {
          title: 'Updated',
          location: 'Kyiv',
          description: 'Updated desc',
          department: 'IT',
        },
      },
    };

    vi.mocked(doc).mockReturnValue(mockDocRef as any);
    vi.mocked(updateDoc).mockResolvedValue(undefined);

    await updateCareer('career-1', patch);

    expect(doc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, patch);
  });

  it('deleteCareer deletes document', async () => {
    const mockDocRef = { id: 'career-1' };

    vi.mocked(doc).mockReturnValue(mockDocRef as any);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);

    await deleteCareer('career-1');

    expect(doc).toHaveBeenCalled();
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
  });
});
