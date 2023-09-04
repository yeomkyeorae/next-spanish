import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import { Word } from '@/types';

export const getWords = async () => {
  const citiesRef = collection(dbService, 'words');

  // Create a query against the collection.
  const q = query(citiesRef);
  const querySnapshot = await getDocs(q);

  const words: Word[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    words.push({
      spanish: data.spanish,
      korean: data.korean,
    });
  });

  return words;
};

export const enrollWord = async (spanish: string, korean: string) => {
  try {
    const docRef = await addDoc(collection(dbService, 'words'), {
      spanish: spanish,
      korean: korean,
      createdDate: new Date().toISOString(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
