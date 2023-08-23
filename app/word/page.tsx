'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import Input from '@/components/input';

type Word = { spanish: string, korean: string };

export default function Word() {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const [words, setWords] = useState<Word[]>([]);

  const getWords = async () => {
    const citiesRef = collection(dbService, "words");

    // Create a query against the collection.
    const q = query(citiesRef);
    const querySnapshot = await getDocs(q);
    
    const words: Word[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();

      words.push({
        spanish: data.spanish,
        korean: data.korean
      });
    });

    setWords(words);
  }

  const enrollWord = async () => {
    try {
      const docRef = await addDoc(collection(dbService, "words"), {
        spanish: spanish,
        korean: korean,
        createdDate: new Date().toISOString()
      });

      setWords(words.concat({ spanish, korean }));
      
      setSpanish('');
      setKorean('');

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const onClickHandler = () => {
    console.log('clicked!', spanish, korean);
    enrollWord();
  }

  useEffect(() => {
    getWords();
  }, []);

  return (
    <div>
      Word!
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
      {
        words && words.map((words, index) => <li key={index}>{words.spanish} - {words.korean}</li>)
      }
    </div>
  );
}