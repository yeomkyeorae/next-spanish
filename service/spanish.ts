import {
  collection,
  addDoc,
  query,
  getDocs,
  limit,
  deleteDoc,
  doc,
  orderBy,
  startAt,
  endAt,
  where,
  updateDoc,
  startAfter,
} from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import { Spanish } from '@/types';

export const getWords = async (userId: string, startAtChar: string, limitNumber: number) => {
  const citiesRef = collection(dbService, 'word');

  // Create a query against the collection.
  const q = query(
    citiesRef,
    where('userId', '==', userId),
    limit(limitNumber),
    orderBy('spanish'),
    startAt(startAtChar),
    endAt(startAtChar + '\uf8ff'),
  );
  const querySnapshot = await getDocs(q);

  const words: Spanish[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    words.push({
      id: doc.id,
      spanish: data.spanish,
      korean: data.korean,
    });
  });

  return words;
};

export const getSentences = async (userId: string, startAtChar: string, limitNumber: number) => {
  const citiesRef = collection(dbService, 'sentence');

  // Create a query against the collection.
  const q = query(
    citiesRef,
    where('userId', '==', userId),
    limit(limitNumber),
    orderBy('spanish'),
    startAt(startAtChar),
    endAt(startAtChar + '\uf8ff'),
  );
  const querySnapshot = await getDocs(q);

  const sentences: Spanish[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    sentences.push({
      id: doc.id,
      spanish: data.spanish,
      korean: data.korean,
    });
  });

  return sentences;
};

export const getFirstSentences = async (userId: string, limitNumber: number) => {
  const queryResult = query(
    collection(dbService, 'sentence'),
    where('userId', '==', userId),
    orderBy('createdDate', 'desc'),
    limit(limitNumber),
  );
  const currentSnapshots = await getDocs(queryResult);
  const firstSentences = currentSnapshots.docs;

  return firstSentences;
};

export const getNextSentences = async (userId: string, currentSentence: any, limitNumber: number) => {
  const nextQueryResult = query(
    collection(dbService, 'sentence'),
    where('userId', '==', userId),
    orderBy('createdDate', 'desc'),
    startAfter(currentSentence),
    limit(limitNumber),
  );

  const currentSnapshots = await getDocs(nextQueryResult);
  const nextSentences = currentSnapshots.docs;

  return nextSentences;
};

export const enrollSpanish = async (userId: string, type: 'word' | 'sentence', spanish: string, korean: string) => {
  try {
    const docRef = await addDoc(collection(dbService, type), {
      spanish: spanish,
      korean: korean,
      createdDate: new Date().toISOString(),
      userId,
    });

    return docRef.id;
  } catch (err) {
    throw err;
  }
};

export const deleteSpanish = async (type: 'word' | 'sentence', id: string) => {
  try {
    await deleteDoc(doc(dbService, type, id));
  } catch (err) {
    throw err;
  }
};

export const modifySpanish = async (type: 'word' | 'sentence', id: string, spanish: string, korean: string) => {
  try {
    await updateDoc(doc(dbService, type, id), {
      spanish: spanish,
      korean: korean,
    });
  } catch (err) {
    throw err;
  }
};

export const getWordInfos = async (userId: string, wordId: string) => {
  const queryResult = query(
    collection(dbService, 'additionalWordInfo'),
    where('userId', '==', userId),
    where('wordId', '==', wordId),
    orderBy('createdDate', 'asc'),
  );
  const currentSnapshots = await getDocs(queryResult);
  const wordInfos = currentSnapshots.docs;

  return wordInfos;
};

export const enrollWordInfo = async (userId: string, wordId: string, spanish: string, explanation: string) => {
  try {
    const docRef = await addDoc(collection(dbService, 'additionalWordInfo'), {
      spanish,
      wordId,
      explanation,
      createdDate: new Date().toISOString(),
      userId,
    });

    return docRef.id;
  } catch (err) {
    throw err;
  }
};

export const deleteWordInfo = async (id: string) => {
  try {
    await deleteDoc(doc(dbService, 'additionalWordInfo', id));
  } catch (err) {
    throw err;
  }
};

export const modifyWordInfo = async (id: string, spanish: string, explanation: string) => {
  try {
    await updateDoc(doc(dbService, 'additionalWordInfo', id), {
      spanish,
      explanation,
    });
  } catch (err) {
    throw err;
  }
};
