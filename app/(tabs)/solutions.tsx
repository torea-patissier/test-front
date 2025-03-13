import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getSolutions } from '@/app/api/solutions';
import { styles } from '@/styles/screens/solutions';

interface Solution {
  id: string;
  gridData: string;
  createdAt: string;
  result: number;
  algoGenerated: boolean;
  correct: boolean;
}

export default function SolutionsScreen() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSolutions = async () => {
    try {
      const data = await getSolutions();
      console.log('data ::::', data);
      setSolutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Solution }) => (
    <View
      style={[
        styles.solutionCard,
        { backgroundColor: item.correct ? '#e6ffe6' : '#ffe6e6' },
      ]}
    >
      <Text style={styles.solutionText}>Data: [{item.gridData}]</Text>
      <Text style={styles.solutionText}>Created: {item.createdAt}</Text>
      <Text style={styles.solutionText}>Result: {item.result}</Text>
      <Text style={styles.solutionText}>
        Is Algo Generated: {item.algoGenerated ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.solutionText}>
        Is Correct: {item.correct ? 'Yes' : 'No'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading solutions...</Text>
      ) : solutions.length > 0 ? (
        <FlatList
          style={styles.list}
          data={solutions}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No solutions found</Text>
      )}
    </View>
  );
}
