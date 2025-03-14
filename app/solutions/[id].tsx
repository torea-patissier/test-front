import { View, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, H2, XStack, YStack, Text, Button, Input } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Solution } from '@/types/solutions';
import { updateSolutionById, getSolutionById } from '@/api/solutions';
import { PuzzleSolutionSchema } from '@/constants/Zod';
import { ZodError } from 'zod';

export default function EditSolutionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [gridData, setGridData] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const loadSolution = async () => {
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
    };

    loadSolution();
  }, [id]);

  const validateGridData = useCallback((data: string): number[] | null => {
    try {
      const gridDataArray = data
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));

      const validatedData = PuzzleSolutionSchema.parse({
        gridData: gridDataArray,
      });
      setValidationError(null);
      return validatedData.gridData;
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationError(err.errors[0].message);
      } else {
        setValidationError('Invalid grid data format');
      }
      return null;
    }
  }, []);

  const handleUpdate = async () => {
    const validatedGridData = validateGridData(gridData);
    if (!validatedGridData) {
      return;
    }

    try {
      await updateSolutionById(id, { gridData: validatedGridData });
      router.back();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update solution'
      );
    }
  };

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
                onChangeText={(text) => {
                  setGridData(text);
                  validateGridData(text);
                }}
                style={{ backgroundColor: colors.pressableActive }}
                keyboardType='numeric'
                maxLength={17}
              />
              {validationError && (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {validationError}
                </Text>
              )}
            </YStack>

            <YStack>
              <Text style={{ color: colors.text }}>Result</Text>
              <Text style={{ color: colors.text, fontSize: 16, marginTop: 4 }}>
                {solution.result}
              </Text>
            </YStack>

            <YStack>
              <Text style={{ color: colors.text }}>Manual</Text>
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
              <Button
                flex={1}
                theme='active'
                onPress={handleUpdate}
                disabled={!!validationError}
              >
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
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
