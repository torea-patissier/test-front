import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {



  const grid = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row,rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell,cellIndex) =>(
              <ThemedText key={cellIndex}>{cell}</ThemedText>
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
    gap: 10,
  },
  grid:{
    flexDirection: 'column',
    gap: 10,
  }
});
