import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import { Sentence } from '@/types';

export const getSentences = async () => {
  const citiesRef = collection(dbService, 'sentences');

  // Create a query against the collection.
  const q = query(citiesRef);
  const querySnapshot = await getDocs(q);

  const sentences: Sentence[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    sentences.push({
      spanish: data.spanish,
      korean: data.korean,
    });
  });

  return sentences;
};

export const enrollSentence = async (spanish: string, korean: string) => {
  try {
    const docRef = await addDoc(collection(dbService, 'sentences'), {
      spanish: spanish,
      korean: korean,
      createdDate: new Date().toISOString(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
