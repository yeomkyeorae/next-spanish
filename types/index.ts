import { NoteState } from '@/def';

export type Spanish = { id: string; spanish: string; korean: string };

export type EnrollMode = 'Enroll' | 'Modify';

export type ModifyInfo = {
  mId: string;
  mSpanish: string;
  mKorean: string;
};

export type NoteStateType = keyof typeof NoteState;

export interface WordInfo {
  id: string;
  explanation: string;
  spanish: string;
}
