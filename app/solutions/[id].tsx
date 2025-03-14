import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, H2, XStack, YStack, Text, Button, Input } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Solution } from '@/types/solutions';
import { updateSolutionById, getSolutionById } from '@/api/solutions';

export default function EditSolutionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [gridData, setGridData] = useState('');

  useEffect(() => {
    async function loadSolution() {
      if (!id) return;
      try {
        const data = await getSolutionById(id);
        setSolution(data);
        setGridData(data.gridData.join(','));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    loadSolution();
  }, [id]);

  async function handleUpdate() {
    try {
      const gridDataArray = gridData
        .split(',')
        .map((num) => parseInt(num.trim()));
      await updateSolutionById(id, { gridData: gridDataArray });
      router.back();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update solution'
      );
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>{error}</Text>
      </View>
    );
  }

  if (!solution) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>Solution not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card
        elevate
        size='$4'
        bordered
        style={[styles.card, { backgroundColor: colors.pressable }]}
      >
        <Card.Header padded>
          <XStack justifyContent='space-between' alignItems='center'>
            <H2 style={{ color: colors.text }}>Edit Solution</H2>
            <Button
              variant='outlined'
              icon={<IconSymbol name='xmark' size={20} color={colors.text} />}
              onPress={() => router.back()}
            />
          </XStack>
        </Card.Header>

        <Card.Footer padded>
          <YStack gap='$4' width='100%'>
            <YStack>
              <Text style={{ color: colors.text }}>Grid Data</Text>
              <Input
                value={gridData}
                onChangeText={setGridData}
                style={{ backgroundColor: colors.pressableActive }}
              />
            </YStack>

            <YStack>
              <Text style={{ color: colors.text }}>Result</Text>
              <Text style={{ color: colors.text, fontSize: 16, marginTop: 4 }}>
                {solution.result}
              </Text>
            </YStack>

            <YStack>
              <Text style={{ color: colors.text }}>Algo Generated</Text>
              <Text style={{ color: colors.text, fontSize: 16, marginTop: 4 }}>
                {solution.algoGenerated ? 'Yes' : 'No'}
              </Text>
            </YStack>

            <YStack>
              <Text style={{ color: colors.text }}>Correct</Text>
              <Text style={{ color: colors.text, fontSize: 16, marginTop: 4 }}>
                {solution.correct ? 'Yes' : 'No'}
              </Text>
            </YStack>

            <XStack gap='$4'>
              <Button flex={1} variant='outlined' onPress={() => router.back()}>
                Cancel
              </Button>
              <Button flex={1} theme='active' onPress={handleUpdate}>
                Update
              </Button>
            </XStack>
          </YStack>
        </Card.Footer>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    width: '100%',
  },
});
