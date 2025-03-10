import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
export default function HomeScreen() {
  
  const initialGrid = [
    ["", null, "", "-","",null,"66"],
    ["+", null, "*", null,"-",null,"="],
    ["13", null, "12", null,"11",null,"10"],
    ["*", null, "+", null,"+",null,"-"],
    ["", null, "", null,"",null,""],
    ["/", "", "+", null,"*","","/"],
  ];

  const [grid, setGrid] = useState(initialGrid);

  const handleCellChange = (rowIndex: number, cellIndex: number, number: string) => {
    
    const newGrid = [...grid];    
    
    if(newGrid.flat().includes(number)){
      alert('Number already in grid');
      return;
    }
    
    if(Number(number) < 1 || Number(number) > 9 || isNaN(Number(number))){
      alert('Please enter a number between 1 and 9');
      return;
    }
    
    newGrid[rowIndex][cellIndex] = number;
    setGrid(newGrid);
  }

  const resetGrid = () => {
    setGrid(initialGrid);
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row,rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell,cellIndex) =>(
              cell === "" ? (
                <TextInput
                  key={cellIndex}
                  style={styles.cell}
                  value={cell}
                  onChangeText={(text) => handleCellChange(rowIndex, cellIndex, text)}
                  keyboardType="numeric"
                />
              ) : (
                <ThemedText
                  key={cellIndex}
                  style={cell === null ? styles.nullCell : styles.cell}>
                  {cell}
                </ThemedText>
              )
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGrid}>
        <ThemedText style={styles.resetButtonText}>Reset Grid</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  resetButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
