import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {



  const grid = [
    ["01", "02", "03", "04","05","06","07"],
    ["08", "09", "10", "11","12","13","14"],
    ["15", "16", "17", "18","19","20","21"],
    ["22", "23", "24", "25","26","27","28"],
    ["29", "30", "31", "32","33","34","35"],
    ["36", "37", "38", "39","40","41","42"],
  ]
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row,rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell,cellIndex) =>(
              <ThemedText key={cellIndex} style={styles.cell}>{cell}</ThemedText>
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
    borderWidth: 2,
  },
  cell:{
    borderWidth: 2,
    borderColor: 'black',
    width: 50,
    height: 50,
  }
});
