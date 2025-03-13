import { StyleSheet, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ErrorMessage } from '@/constants/ErrorMessage';
import { postSolution } from '@/app/api/solutions';

interface GridCell {
  value: string | null;
  inputName?: string | null;
}

type GridData = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
  I: number;
};

const INITIAL_GRID: GridCell[][] = [
  [
    { value: '', inputName: 'A' },
    { value: null },
    { value: '', inputName: 'E' },
    { value: '-' },
    { value: '', inputName: 'F' },
    { value: null },
    { value: '66' },
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

const INITIAL_GRID_DATA: GridData = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
};

export default function HomeScreen() {
  const [grid, setGrid] = useState<GridCell[][]>(INITIAL_GRID);
  const [enteredNumbers, setEnteredNumbers] = useState<string>('');
  const [gridData, setGridData] = useState<GridData>(INITIAL_GRID_DATA);

  const validateInput = (inputValue: string, grid: GridCell[][]): boolean => {
    if (grid.flat().some((cell) => cell.value === inputValue)) {
      Alert.alert(
        ErrorMessage.ALREADY_IN_GRID.t,
        ErrorMessage.ALREADY_IN_GRID.m
      );
      return false;
    }

    const num = Number(inputValue);
    if (num < 1 || num > 9 || isNaN(num)) {
      Alert.alert(ErrorMessage.INVALID_NUMBER.t, ErrorMessage.INVALID_NUMBER.m);
      return false;
    }

    return true;
  };

  const updateGridData = (
    currentCell: GridCell,
    inputValue: string
  ): GridData => {
    if (!currentCell.inputName) return gridData;

    return {
      ...gridData,
      [currentCell.inputName]: Number(inputValue),
    };
  };

  useEffect(() => {
    console.log(gridData);
  }, [gridData]);

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    inputValue: string
  ) => {
    const newGrid = [...grid];

    if (!validateInput(inputValue, newGrid)) {
      return;
    }

    const currentCell = newGrid[rowIndex][cellIndex];
    newGrid[rowIndex][cellIndex] = {
      value: inputValue,
      inputName: currentCell.inputName,
    };

    setGrid(newGrid);
    setEnteredNumbers((prev) => (prev ? `${prev}${inputValue}` : inputValue));
    setGridData(updateGridData(currentCell, inputValue));
  };

  const resetGrid = () => {
    setGrid(INITIAL_GRID);
    setEnteredNumbers('');
    setGridData(INITIAL_GRID_DATA);
  };

  const calculateResult = async () => {
    if (enteredNumbers.length < 9) {
      Alert.alert(ErrorMessage.WARNING.t, ErrorMessage.WARNING.m);
      return;
    }

    try {
      const response = await postSolution({
        gridData: JSON.stringify(gridData),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to submit solution - Invalid content type');
    }
  };

  const renderCell = (cell: GridCell, rowIndex: number, cellIndex: number) => {
    if (cell.value === '') {
      return (
        <TextInput
          key={cellIndex}
          style={styles.cell}
          value={cell.value}
          onChangeText={(text) => handleCellChange(rowIndex, cellIndex, text)}
          keyboardType="numeric"
        />
      );
    }

    return (
      <ThemedText
        key={cellIndex}
        style={cell.value === null ? styles.nullCell : styles.cell}
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
            {enteredNumbers}
          </ThemedText>
        </View>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) =>
              renderCell(cell, rowIndex, cellIndex)
            )}
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={resetGrid}>Reset Grid</Button>
        <Button onPress={calculateResult}>Calculate</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gridHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridHeaderText: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  row: {
    flexDirection: 'row',
  },
  grid: {
    flexDirection: 'column',
  },
  nullCell: {
    width: 50,
    height: 50,
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
});
