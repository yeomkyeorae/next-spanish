import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';

export const enrollNote = async (userId: string, content: string) => {
  try {
    const docRef = await addDoc(collection(dbService, 'note'), {
      content,
      createdDate: new Date().toISOString(),
      userId,
    });

    console.log('Document written with ID: ', docRef.id);
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
