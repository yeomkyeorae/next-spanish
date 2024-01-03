import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  where,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';

export const getFirstNote = async (userId: string) => {
  const queryResult = query(
    collection(dbService, 'note'),
    where('userId', '==', userId),
    orderBy('createdDate'),
    limit(1),
  );
  const currentSnapshots = await getDocs(queryResult);
  const firstNote = currentSnapshots.docs[0];

  return firstNote;
};

export const getNextNote = async (userId: string, currentNote: any) => {
  const nextQueryResult = query(
    collection(dbService, 'note'),
    where('userId', '==', userId),
    orderBy('createdDate'),
    startAfter(currentNote),
    limit(1),
  );

  const currentSnapshots = await getDocs(nextQueryResult);
  const nextNote = currentSnapshots.docs[0];

  return nextNote;
};

export const getBeforeNote = async (userId: string, currentNote: any) => {
  const beforeQueryResult = query(
    collection(dbService, 'note'),
    where('userId', '==', userId),
    orderBy('createdDate'),
    endBefore(currentNote),
    limitToLast(1),
  );

  const currentSnapshots = await getDocs(beforeQueryResult);
  const beforeNote = currentSnapshots.docs[0];

  return beforeNote;
};

export const enrollNote = async (userId: string, content: string) => {
  try {
    await addDoc(collection(dbService, 'note'), {
      content,
      createdDate: new Date().toISOString(),
      userId,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteNote = async (id: string) => {
  try {
    await deleteDoc(doc(dbService, 'note', id));
  } catch (err) {
    throw err;
  }
};

export const modifyNote = async (id: string, content: string) => {
  try {
    await updateDoc(doc(dbService, 'note', id), {
      content,
    });
  } catch (err) {
    throw err;
  }
};
