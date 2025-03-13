import { useState } from 'react';
import { Alert } from 'react-native';
import { postSolution } from '@/api/solutions';
import {
  PuzzleCell,
  PuzzleNumbers,
  EMPTY_PUZZLE_NUMBERS,
  PUZZLE_INPUT_POSITIONS,
  createFreshPuzzleGrid,
} from '@/constants/Puzzle';
import { PuzzleNumbersSchema, PuzzleSolutionSchema } from '@/constants/Zod';
import { z } from 'zod';

export const usePuzzle = () => {
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleCell[][]>(
    createFreshPuzzleGrid()
  );
  const [userInputNumbers, setUserInputNumbers] = useState<string>('');
  const [puzzleNumbers, setPuzzleNumbers] =
    useState<PuzzleNumbers>(EMPTY_PUZZLE_NUMBERS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updatePuzzleNumbers = (
    currentCell: PuzzleCell,
    newValue: string
  ): PuzzleNumbers => {
    if (!currentCell.inputName) return puzzleNumbers;

    const positionIndex = PUZZLE_INPUT_POSITIONS.indexOf(currentCell.inputName);
    if (positionIndex === -1) return puzzleNumbers;

    return puzzleNumbers.map((num, index) =>
      index === positionIndex ? Number(newValue) : num
    );
  };

  const handlePuzzleCellInput = (
    rowIndex: number,
    cellIndex: number,
    newValue: string
  ) => {
    const currentCell = puzzleGrid[rowIndex][cellIndex];
    if (!currentCell.inputName) return;

    const updatedGrid = puzzleGrid.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === cellIndex
          ? { ...cell, value: newValue }
          : cell
      )
    );

    const updatedUserInput = userInputNumbers
      .replace(currentCell.value || '', '')
      .concat(newValue);

    setPuzzleGrid(updatedGrid);
    setUserInputNumbers(updatedUserInput);
    setPuzzleNumbers(updatePuzzleNumbers(currentCell, newValue));
    setErrorMessage(null);
  };

  const resetPuzzle = () => {
    const freshGrid = createFreshPuzzleGrid();

    setPuzzleGrid(freshGrid);
    setUserInputNumbers('');
    setPuzzleNumbers([...EMPTY_PUZZLE_NUMBERS]);
    setErrorMessage(null);
  };

  const submitPuzzleSolution = async () => {
    try {
      PuzzleNumbersSchema.parse(puzzleNumbers);
      const solutionData = { gridData: puzzleNumbers };
      PuzzleSolutionSchema.parse(solutionData);
      await postSolution(solutionData);
      setErrorMessage(null);
    } catch (error) {
      console.log('error', error);
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors.map((err) => err.message).join(', '));
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return {
    puzzleGrid,
    userInputNumbers,
    handlePuzzleCellInput,
    resetPuzzle,
    submitPuzzleSolution,
    errorMessage,
  };
};
