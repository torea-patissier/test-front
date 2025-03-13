import { z } from 'zod';

export const PuzzleNumbersSchema = z
  .array(
    z
      .number()
      .min(1, 'Numbers must be between 1 and 9')
      .max(9, 'Numbers must be between 1 and 9')
      .int('Only integers are allowed')
  )
  .length(9, 'Must provide exactly 9 numbers')
  .refine(
    (numbers): numbers is number[] => {
      return new Set(numbers).size === numbers.length;
    },
    {
      message: 'All numbers must be unique',
    }
  );

export const PuzzleSolutionSchema = z.object({
  gridData: PuzzleNumbersSchema,
});
