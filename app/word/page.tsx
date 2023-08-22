'use client';
import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';

export default function Word() {
  const testAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(dbService, "word"), {
        spanish: "Hablar",
        korean: "말하다",
        createdDate: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    testAddDoc();
  }, []);

  return <div>Word!<button>추가</button></div>
}