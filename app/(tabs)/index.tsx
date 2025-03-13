import { View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/constants/ErrorMessage';
import { postSolution } from '@/api/solutions';
import { styles } from '@/styles/screens/home';
import {
  PuzzleCell,
  PuzzleNumbers,
  EMPTY_PUZZLE_NUMBERS,
  PUZZLE_INPUT_POSITIONS,
  EMPTY_PUZZLE_GRID,
} from '@/constants/Puzzle';

export default function PuzzleScreen() {
  const [puzzleGrid, setPuzzleGrid] =
    useState<PuzzleCell[][]>(EMPTY_PUZZLE_GRID);
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

  const resetPuzzle = () => {
    setPuzzleGrid(EMPTY_PUZZLE_GRID);
    setUserInputNumbers('');
    setPuzzleNumbers(EMPTY_PUZZLE_NUMBERS);
  };

  const submitPuzzleSolution = async () => {
    if (userInputNumbers.length < 9) {
      Alert.alert(ErrorMessage.WARNING.t, ErrorMessage.WARNING.m);
      return;
    }

    // Check if all numbers are between 1-9
    const isValidNumbers = puzzleNumbers.every((num) => num >= 1 && num <= 9);
    if (!isValidNumbers) {
      Alert.alert('Error', 'All numbers must be between 1 and 9');
      return;
    }

    // Check for duplicate numbers
    const uniqueNumbers = new Set(puzzleNumbers);
    if (uniqueNumbers.size !== puzzleNumbers.length) {
      Alert.alert('Error', 'Each number can only be used once');
      return;
    }

    try {
      const data = { gridData: puzzleNumbers };
      console.log('Submitting solution data:', data);
      await postSolution(data);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to submit solution - Invalid content type' + error
      );
    }
  };

  const renderPuzzleCell = (
    cell: PuzzleCell,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (cell.inputName) {
      return (
        <TextInput
          key={cellIndex}
          style={styles.cell}
          value={cell.value || ''}
          onChangeText={(text) =>
            handlePuzzleCellInput(rowIndex, cellIndex, text)
          }
          keyboardType="numeric"
        />
      );
    }

    return (
      <ThemedText
        key={cellIndex}
        style={[
          cell.value === null ? styles.nullCell : styles.cell,
          { lineHeight: 50 },
        ]}
      >
        {cell.value}
      </ThemedText>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.gridHeader}>
          <ThemedText style={styles.gridHeaderText}>
            Entered numbers:
          </ThemedText>
          <ThemedText style={styles.gridHeaderText}>
            {userInputNumbers}
          </ThemedText>
        </View>
        {puzzleGrid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) =>
              renderPuzzleCell(cell, rowIndex, cellIndex)
            )}
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={resetPuzzle}>Reset Grid</Button>
        <Button onPress={submitPuzzleSolution}>Calculate</Button>
      </View>
    </View>
  );
}
