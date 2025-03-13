import { z } from 'zod';

export const PuzzleNumbersSchema = z
  .array(z.number().min(1).max(9).int())
  .length(9)
  .refine(
    (numbers): numbers is number[] => {
      return new Set(numbers).size === numbers.length;
    },
    {
      message: 'Rule : 9 unique integers between 1 and 9',
    }
  );

export const PuzzleSolutionSchema = z.object({
  gridData: PuzzleNumbersSchema,
});
