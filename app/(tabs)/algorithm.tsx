import { View, Text, ScrollView } from 'react-native';
import { styles } from '@/styles/screens/algorithm';
import { useEffect, useState } from 'react';
import { getAlgorithm } from '@/api/algorithm';

export default function AlgorithmScreen() {
  const [algorithm, setAlgorithm] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlgorithm() {
      try {
        const data = await getAlgorithm();
        console.log('Algorithm data:', data);
        setAlgorithm(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
    fetchAlgorithm();
  }, []);

  const renderAlgorithmData = () => {
    if (!algorithm) return null;
    return Object.entries(algorithm).map(([key, value]) => (
      <View key={key} style={{ marginVertical: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{key}:</Text>
        <Text>{JSON.stringify(value, null, 2)}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error: {error}</Text>
      ) : !algorithm ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={{ width: '100%', padding: 10 }}>
          {renderAlgorithmData()}
        </ScrollView>
      )}
    </View>
  );
}
