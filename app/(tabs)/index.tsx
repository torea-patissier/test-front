import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-gesture-handler';
import Button from '@/components/ui/Button';
import { styles } from '@/styles/screens/home';
import { PuzzleCell } from '@/constants/Puzzle';
import { usePuzzle } from '@/hooks/usePuzzle';

export default function PuzzleScreen() {
  const {
    puzzleGrid,
    userInputNumbers,
    handlePuzzleCellInput,
    resetPuzzle,
    submitPuzzleSolution,
  } = usePuzzle();

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
        {puzzleGrid.map((row: PuzzleCell[], rowIndex: number) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell: PuzzleCell, cellIndex: number) =>
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
