export const WORD_REPRESENTS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  // 'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  // 'y',
  'z',
];

export const SPECIAL_ALFABETOS = {
  Uppercase: ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ü', 'Ñ'],
  Lowercase: ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
};

export const SPECIAL_SIGN = ['¿', '¡'];

export const WORD_MAX_LENGTH = 200;
export const SENTENCE_MAX_LENGTH = 500;
export const SENTENCE_PER_PAGE = 5;

export const MenuNameConvertName = {
  note: '등록',
  enroll: '노트',
  modify: '노트',
};

export const NoteState = {
  note: 'note' as 'note',
  enroll: 'enroll' as 'enroll',
  modify: 'modify' as 'modify',
};

export const TargetSpanishCharListForInput = ['a', 'e', 'i', 'o', 'u', 'n', 'A', 'E', 'I', 'O', 'U', 'N', '?', '!'];

export const SpanishConvertDict = {
  a: ['á'],
  A: ['Á'],
  e: ['é'],
  E: ['É'],
  i: ['í'],
  I: ['Í'],
  o: ['ó'],
  O: ['Ó'],
  u: ['ú', 'ü'],
  U: ['Ú', 'Ü'],
  n: ['ñ'],
  N: ['Ñ'],
  '?': ['¿'],
  '!': ['¡'],
};

export const SpanishKeyboardActivationKey = 'ArrowUp';
