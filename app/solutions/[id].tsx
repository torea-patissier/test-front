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

  if (!solution || error) {
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
        style={[styles.card, { backgroundColor: colors.cardBackground }]}
      >
        <Card.Header padded>
          <XStack justifyContent='space-between' alignItems='center'>
            <H2 style={{ color: colors.text, fontSize: 24, fontWeight: '600' }}>
              Edit Solution
            </H2>
            <Button
              variant='outlined'
              icon={<IconSymbol name='xmark' size={20} color={colors.text} />}
              onPress={() => router.back()}
              style={{ borderColor: colors.border }}
            />
          </XStack>
        </Card.Header>

        <Card.Footer padded>
          <YStack gap='$4' width='100%'>
            <YStack>
              <Text style={[styles.label, { color: colors.text }]}>
                Grid Data
              </Text>
              <Input
                value={gridData}
                onChangeText={(text) => {
                  setGridData(text);
                  validateGridData(text);
                }}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.pressable,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                keyboardType='numeric'
                maxLength={17}
                placeholder='Enter grid data...'
                placeholderTextColor={colors.tabIconDefault}
              />
              {validationError && (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {validationError}
                </Text>
              )}
            </YStack>

            <YStack style={styles.resultContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Result</Text>
              <Text
                style={[
                  styles.resultText,
                  {
                    color: colors.text,
                    backgroundColor: colors.pressable,
                    borderColor: colors.border,
                  },
                ]}
              >
                {solution.result}
              </Text>
            </YStack>

            <XStack gap='$4' style={styles.buttonContainer}>
              <Button
                flex={1}
                variant='outlined'
                onPress={() => router.back()}
                style={{ borderColor: colors.border }}
              >
                <Text style={{ color: colors.text }}>Cancel</Text>
              </Button>
              <Button
                flex={1}
                theme='active'
                onPress={handleUpdate}
                disabled={!!validationError}
                style={{
                  backgroundColor: validationError
                    ? colors.tabIconDefault
                    : colors.tint,
                  opacity: validationError ? 0.5 : 1,
                }}
              >
                <Text style={{ color: colors.background }}>Update</Text>
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
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 8,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 16,
  },
});
