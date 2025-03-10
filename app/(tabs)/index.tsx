import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-gesture-handler';
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
                  onChangeText={(text) => {
                    console.log('text ',text);
                    const newGrid = [...grid];
                    console.log('newGrid ',newGrid);
                    newGrid[rowIndex][cellIndex] = text;
                    setGrid(newGrid);
                  }}
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
  }
});
