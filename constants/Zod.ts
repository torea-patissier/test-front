import { z } from 'zod';

export const PuzzleCellSchema = z.object({
  value: z.string().nullable(),
  inputName: z.string().nullable().optional(),
});

export const PuzzleGridSchema = z.array(z.array(PuzzleCellSchema));

export const PuzzleNumbersSchema = z
  .array(z.number())
  .length(9)
  .refine(
    (numbers): numbers is number[] => {
      return (
        numbers.every((num) => Number.isInteger(num) && num >= 1 && num <= 9) &&
        new Set(numbers).size === numbers.length
      );
    },
    {
      message: 'Rule : 9 unique integers between 1 and 9',
    }
  );

export const PuzzleSolutionSchema = z.object({
  gridData: PuzzleNumbersSchema,
});
