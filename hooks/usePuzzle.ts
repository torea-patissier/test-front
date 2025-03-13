import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { postSolution } from '@/api/solutions';
import { ErrorMessage } from '@/constants/ErrorMessage';
import {
  PuzzleCell,
  PuzzleNumbers,
  EMPTY_PUZZLE_NUMBERS,
  PUZZLE_INPUT_POSITIONS,
  createFreshPuzzleGrid,
} from '@/constants/Puzzle';

export const usePuzzle = () => {
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleCell[][]>(
    createFreshPuzzleGrid()
  );
  const [userInputNumbers, setUserInputNumbers] = useState('');
  const [puzzleNumbers, setPuzzleNumbers] =
    useState<PuzzleNumbers>(EMPTY_PUZZLE_NUMBERS);

  const updatePuzzleNumbers = (
    currentCell: PuzzleCell,
    newValue: string
  ): PuzzleNumbers => {
    if (!currentCell.inputName) return puzzleNumbers;

    const positionIndex = PUZZLE_INPUT_POSITIONS.indexOf(currentCell.inputName);
    if (positionIndex === -1) return puzzleNumbers;

    const updatedPuzzleNumbers = [...puzzleNumbers];
    updatedPuzzleNumbers[positionIndex] = Number(newValue);
    return updatedPuzzleNumbers;
  };

  const handlePuzzleCellInput = (
    rowIndex: number,
    cellIndex: number,
    newValue: string
  ) => {
    const currentCell = puzzleGrid[rowIndex][cellIndex];

    const updatedGrid = [...puzzleGrid];
    updatedGrid[rowIndex][cellIndex] = {
      value: newValue,
      inputName: currentCell.inputName,
    };

    let updatedUserInput = userInputNumbers;
    if (currentCell.value) {
      updatedUserInput = updatedUserInput.replace(currentCell.value, '');
    }
    updatedUserInput += newValue;

    setPuzzleGrid(updatedGrid);
    setUserInputNumbers(updatedUserInput);
    setPuzzleNumbers(updatePuzzleNumbers(currentCell, newValue));
  };

  useEffect(() => {
    console.log('\n\n puzzleNumbers:\n', puzzleNumbers);
  }, [puzzleNumbers]);

  const resetPuzzle = () => {
    setPuzzleGrid(createFreshPuzzleGrid());
    setUserInputNumbers('');
    setPuzzleNumbers(EMPTY_PUZZLE_NUMBERS);
  };

  const submitPuzzleSolution = async () => {
    if (userInputNumbers.length < 9) {
      Alert.alert(ErrorMessage.WARNING.t, ErrorMessage.WARNING.m);
      return;
    }

    const isValidNumbers = puzzleNumbers.every(
      (num: number) => num >= 1 && num <= 9
    );
    if (!isValidNumbers) {
      Alert.alert(ErrorMessage.INVALID_RANGE.t, ErrorMessage.INVALID_RANGE.m);
      return;
    }

    const uniqueNumbers = new Set(puzzleNumbers);
    if (uniqueNumbers.size !== puzzleNumbers.length) {
      Alert.alert(
        ErrorMessage.DUPLICATE_NUMBERS.t,
        ErrorMessage.DUPLICATE_NUMBERS.m
      );
      return;
    }

    try {
      const data = { gridData: puzzleNumbers };
      await postSolution(data);
    } catch (error) {
      Alert.alert(
        ErrorMessage.SUBMISSION_ERROR.t,
        ErrorMessage.SUBMISSION_ERROR.m + ': ' + error
      );
    }
  };

  return {
    puzzleGrid,
    userInputNumbers,
    handlePuzzleCellInput,
    resetPuzzle,
    submitPuzzleSolution,
  };
};
