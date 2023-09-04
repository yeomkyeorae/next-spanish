import { collection, addDoc, query, getDocs, limit } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import { Spanish } from '@/types';
import { MAX_QUERY_NUMBER } from '@/def';

export const getSpanish = async (type: 'words' | 'sentences', limitNumber?: number) => {
  const citiesRef = collection(dbService, type);

  // Create a query against the collection.
  const q = query(citiesRef, limit(limitNumber ?? MAX_QUERY_NUMBER));
  const querySnapshot = await getDocs(q);

  const words: Spanish[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    words.push({
      spanish: data.spanish,
      korean: data.korean,
    });
  });

  return words;
};

export const enrollSpanish = async (type: 'words' | 'sentences', spanish: string, korean: string) => {
  try {
    const docRef = await addDoc(collection(dbService, type), {
      spanish: spanish,
      korean: korean,
      createdDate: new Date().toISOString(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
