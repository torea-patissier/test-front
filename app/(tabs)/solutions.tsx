import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getSolutions } from '@/app/api/solutions';

export default function SolutionsScreen() {
  const [solutions, setSolutions] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSolutions = async () => {
    try {
      const data = await getSolutions();
      setSolutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.solutionCard}>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {solutions.length > 0 ? (
        <FlatList
          style={styles.list}
          data={solutions}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Loading solutions...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  solutionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
  },
  list: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
  },
});
