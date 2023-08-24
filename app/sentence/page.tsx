'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { dbService } from '@/firebase/firebase';
import Input from '@/components/input';

type Sentence = { spanish: string, korean: string };

export default function Sentence() {
  const [spanish, setSpanish] = useState('');
  const [korean, setKorean] = useState('');
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const getSentences = async () => {
    const citiesRef = collection(dbService, "sentences");

    // Create a query against the collection.
    const q = query(citiesRef);
    const querySnapshot = await getDocs(q);
    
    const sentences: Sentence[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();

      sentences.push({
        spanish: data.spanish,
        korean: data.korean
      });
    });

    setSentences(sentences);
  }

  const enrollSentence = async () => {
    try {
      const docRef = await addDoc(collection(dbService, "sentences"), {
        spanish: spanish,
        korean: korean,
        createdDate: new Date().toISOString()
      });

      setSentences(sentences.concat({ spanish, korean }));
      
      setSpanish('');
      setKorean('');

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const onClickHandler = () => {
    console.log('clicked!', spanish, korean);
    enrollSentence();
  }

  useEffect(() => {
    getSentences();
  }, []);

  return (
    <div>
      Sentence!
      <Input value={spanish} setValue={setSpanish} />
      <Input value={korean} setValue={setKorean} />
      <button onClick={onClickHandler}>추가</button>
      {
        sentences && sentences.map((sentences, index) => <li key={index}>{sentences.spanish} - {sentences.korean}</li>)
      }
    </div>
  );
}