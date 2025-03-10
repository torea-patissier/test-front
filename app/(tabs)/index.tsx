import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import Button from '@/components/ui/Button';

interface GridCell {
  value: string | null;
}

export default function HomeScreen() {
  
  const initialGrid: GridCell[][] = [
    [{value: ""}, {value: null}, {value: ""}, {value: "-"}, {value: ""}, {value: null}, {value: "66"}],
    [{value: "+"}, {value: null}, {value: "*"}, {value: null}, {value: "-"}, {value: null}, {value: "="}],
    [{value: "13"}, {value: null}, {value: "12"}, {value: null}, {value: "11"}, {value: null}, {value: "10"}],
    [{value: "*"}, {value: null}, {value: "+"}, {value: null}, {value: "+"}, {value: null}, {value: "-"}],
    [{value: ""}, {value: null}, {value: ""}, {value: null}, {value: ""}, {value: null}, {value: ""}],
    [{value: "/"}, {value: ""}, {value: "+"}, {value: null}, {value: "*"}, {value: ""}, {value: "/"}],
  ];

  const [grid, setGrid] = useState<GridCell[][]>(initialGrid);

  const handleCellChange = (rowIndex: number, cellIndex: number, inputValue: string) => {
    const newGrid = [...grid];    
    
    if(newGrid.flat().some(cell => cell.value === inputValue)){
      alert('Number already in grid');
      return;
    }
    
    if(Number(inputValue) < 1 || Number(inputValue) > 9 || isNaN(Number(inputValue))){
      alert('Please enter a number between 1 and 9');
      return;
    }

    newGrid[rowIndex][cellIndex] = {value: inputValue};
    setGrid(newGrid);
  }

  const resetGrid = () => {
    setGrid(initialGrid);
  }

  const calculateResult = () => {
    // TODO: Implement calculation logic
    alert('Calculation not yet implemented');
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row,rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell,cellIndex) =>(
              cell.value === "" ? (
                <TextInput
                  key={cellIndex}
                  style={styles.cell}
                  value={cell.value}
                  onChangeText={(text) => handleCellChange(rowIndex, cellIndex, text)}
                  keyboardType="numeric"
                />
              ) : (
                <ThemedText
                  key={cellIndex}
                  style={cell.value === null ? styles.nullCell : styles.cell}>
                  {cell.value}
                </ThemedText>
              )
            ))}
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
  row: {
    flexDirection: 'row',      
  },
  grid:{
    flexDirection: 'column',
  },
  nullCell:{
    width: 50,
    height: 50,    
  },
  cell:{
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
  }
});
