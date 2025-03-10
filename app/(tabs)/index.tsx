import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {

  const grid = [
    ["", null, "", "-","",null,"66"],
    ["+", null, "*", null,"-",null,"="],
    ["13", null, "12", null,"11",null,"10"],
    ["*", null, "+", null,"+",null,"-"],
    ["", null, "", null,"",null,""],
    ["/", "", "+", null,"*","","/"],
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row,rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell,cellIndex) =>(
              <ThemedText key={cellIndex} style={cell === null ? styles.nullCell  : styles.cell }>{cell}</ThemedText>
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
