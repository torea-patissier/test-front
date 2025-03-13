import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getSolutions } from '@/app/api/solutions';

export default function TabTwoScreen() {
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

  return (
    <View style={styles.container}>
      {solutions.length > 0 ? (
        solutions.map((solution, index) => (
          <Text key={index}>{JSON.stringify(solution)}</Text>
        ))
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
  },
});
