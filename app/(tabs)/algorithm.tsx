import { View, Text, ActivityIndicator } from 'react-native';
import { createStyles } from '@/styles/screens/algorithm';
import { useState } from 'react';
import { getAlgorithm } from '@/api/algorithm';
import Button from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface AlgorithmResponse {
  message: string;
  status: 'success' | 'error';
}

export default function AlgorithmScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = createStyles(colorScheme);
  const [algorithm, setAlgorithm] = useState<AlgorithmResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAlgorithm() {
    try {
      setIsLoading(true);
      const data = await getAlgorithm();
      setAlgorithm(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const parseAlgorithmMessage = (message: string) => {
    const parts = message.split(', ');
    return parts.map((part, index) => (
      <Text
        key={index}
        style={[styles.responseText, { color: Colors[colorScheme].text }]}
      >
        {part}
      </Text>
    ));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      {!isLoading && !algorithm && (
        <Button onPress={fetchAlgorithm}>Run Algorithm</Button>
      )}

      {isLoading && (
        <ActivityIndicator size='large' color={Colors[colorScheme].text} />
      )}

      {!isLoading && algorithm && !error && (
        <View>
          <Text
            style={[
              styles.responseText,
              {
                fontWeight: 'bold',
                marginBottom: 10,
                color: Colors[colorScheme].text,
              },
            ]}
          >
            Algorithm Results:
          </Text>
          <View
            style={{
              padding: 10,
              backgroundColor:
                algorithm.status === 'success'
                  ? colorScheme === 'dark'
                    ? Colors.dark.success
                    : Colors.light.success
                  : colorScheme === 'dark'
                    ? Colors.dark.error
                    : Colors.light.error,
              borderRadius: 8,
            }}
          >
            {parseAlgorithmMessage(algorithm.message)}
          </View>
        </View>
      )}

      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
}
