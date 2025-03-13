import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getSolutions } from '@/api/solutions';
import { styles } from '@/styles/screens/solutions';

interface Solution {
  id: string;
  gridData: string;
  result: number;
  algoGenerated: boolean;
  correct: boolean;
}

export default function SolutionsScreen() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await getSolutions();
        setSolutions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const renderSolutionCard = ({ item }: { item: Solution }) => (
    <View
      style={[
        styles.solutionCard,
        { backgroundColor: item.correct ? '#e6ffe6' : '#ffe6e6' },
      ]}
    >
      <Text style={styles.solutionText}>Data: [{item.gridData}]</Text>
      <Text style={styles.solutionText}>Result: {item.result}</Text>
      <Text style={styles.solutionText}>
        Is Algo Generated: {item.algoGenerated ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.solutionText}>
        Is Correct: {item.correct ? 'Yes' : 'No'}
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading solutions...</Text>
      </View>
    );
  }

  if (!solutions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No solutions found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={solutions}
        renderItem={renderSolutionCard}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
