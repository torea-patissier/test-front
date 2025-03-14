import { PuzzleCell } from '@/types/solutions/puzzle';

export const EMPTY_PUZZLE_NUMBERS = Array(9).fill(0);

export const PUZZLE_RESULT = 66;

export const PUZZLE_INPUT_POSITIONS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
];

const INITIAL_GRID_STATE: PuzzleCell[][] = [
  [
    { value: '', inputName: 'A' },
    { value: null },
    { value: '', inputName: 'E' },
    { value: '-' },
    { value: '', inputName: 'F' },
    { value: null },
    { value: PUZZLE_RESULT.toString(), result: 'result' },
  ],
  [
    { value: '+' },
    { value: null },
    { value: '*' },
    { value: null },
    { value: '-' },
    { value: null },
    { value: '=' },
  ],
  [
    { value: '13' },
    { value: null },
    { value: '12' },
    { value: null },
    { value: '11' },
    { value: null },
    { value: '10' },
  ],
  [
    { value: '*' },
    { value: null },
    { value: '+' },
    { value: null },
    { value: '+' },
    { value: null },
    { value: '-' },
  ],
  [
    { value: '', inputName: 'B' },
    { value: null },
    { value: '', inputName: 'D' },
    { value: null },
    { value: '', inputName: 'G' },
    { value: null },
    { value: '', inputName: 'I' },
  ],
  [
    { value: '/' },
    { value: '', inputName: 'C' },
    { value: '+' },
    { value: null },
    { value: '*' },
    { value: '', inputName: 'H' },
    { value: '/' },
  ],
];

export const createFreshPuzzleGrid = (): PuzzleCell[][] => {
  return INITIAL_GRID_STATE.map((row) =>
    row.map((cell) => ({
      ...cell,
    }))
  );
};

export const EMPTY_PUZZLE_GRID = createFreshPuzzleGrid();
