import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { getSolutions } from '@/api/solutions';
import { Card, H2, Paragraph, XStack, YStack, Text, Button } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

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
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setIsLoading(true);
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

  const StatusBadge = useCallback(
    ({ success }: { success: boolean }) => (
      <XStack
        style={{
          backgroundColor: success ? colors.success : colors.error,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          alignItems: 'center',
          gap: 4,
        }}
      >
        <IconSymbol
          name={success ? 'checkmark' : 'exclamationmark.triangle.fill'}
          size={14}
          color={colors.background}
        />
        <Text style={{ color: colors.background, fontSize: 14 }}>
          {success ? 'Success' : 'Failed'}
        </Text>
      </XStack>
    ),
    [colors]
  );

  const TypeBadge = useCallback(
    ({ isAlgorithm }: { isAlgorithm: boolean }) => (
      <XStack
        style={{
          backgroundColor: isAlgorithm ? colors.primary : colors.tint,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: colors.background,
            fontSize: 14,
          }}
        >
          {isAlgorithm ? 'Algorithm' : 'Manual'}
        </Text>
      </XStack>
    ),
    [colors]
  );

  const renderSolutionCard = useCallback(
    ({ item }: { item: Solution }) => (
      <Card
        elevate
        size='$2'
        bordered
        style={[
          styles.solutionCard,
          {
            borderColor: item.correct ? colors.success : colors.error,
            borderLeftWidth: 4,
            backgroundColor: colors.pressable,
          },
        ]}
      >
        <Card.Header padded>
          <YStack space={8}>
            <XStack justifyContent='space-between' alignItems='center'>
              <H2 style={{ color: colors.text }}>Result: {item.result}</H2>
              <XStack space={8}>
                <StatusBadge success={item.correct} />
                <TypeBadge isAlgorithm={item.algoGenerated} />
              </XStack>
            </XStack>

            <YStack
              style={{
                backgroundColor: colors.pressableActive,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: 'SpaceMono',
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                [{item.gridData}]
              </Text>
            </YStack>
          </YStack>
        </Card.Header>

        <Card.Footer padded>
          <XStack justifyContent='space-between' alignItems='center'>
            <Text style={{ color: colors.tabIconDefault }}>ID: {item.id}</Text>
            <Button
              size='$3'
              variant='outlined'
              onPress={() => {
                /* Handle details navigation */
              }}
            >
              Details
            </Button>
          </XStack>
        </Card.Footer>
      </Card>
    ),
    [colors]
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Paragraph style={{ color: colors.error }}>Error: {error}</Paragraph>
      </View>
    );
  }

  if (!solutions.length) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.tabIconDefault }]}>
          No solutions found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        style={styles.list}
        data={solutions}
        renderItem={renderSolutionCard}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  solutionCard: {
    marginVertical: 8,
    borderWidth: 1,
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
