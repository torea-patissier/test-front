import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import {
  getSolutions,
  deleteSolutionById,
  deleteAllSolutions,
} from '@/api/solutions';
import { Card, H2, XStack, YStack, Text, Button, AlertDialog } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { Solution } from '@/types/solutions';
import { router } from 'expo-router';

export default function SolutionsScreen() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleDeleteSolutionbyId = useCallback(async (id: string) => {
    try {
      await deleteSolutionById(id);
      setSolutions((prevSolutions) =>
        prevSolutions.filter((solution) => solution.id !== id)
      );
    } catch (err) {
      console.error('Error deleting solution:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to delete solution'
      );
    }
  }, []);

  const handleDeleteAllSolutions = useCallback(async () => {
    try {
      await deleteAllSolutions();
      setSolutions([]);
    } catch (err) {
      console.error('Error deleting all solutions:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to delete all solutions'
      );
    }
  }, []);

  const fetchSolutions = async () => {
    try {
      setIsLoading(true);
      const data = await getSolutions();
      console.log('data', data);
      setSolutions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSolutions();
    }, [])
  );

  const StatusBadge = useCallback(
    ({ success }: { success: boolean }) => (
      <XStack
        style={[
          styles.badge,
          {
            backgroundColor: success ? colors.success : colors.error,
          },
        ]}
      >
        <Text style={styles.badgeText}>{success ? 'Success' : 'Failed'}</Text>
      </XStack>
    ),
    [colors]
  );

  const TypeBadge = useCallback(
    ({ isAlgorithm }: { isAlgorithm: boolean }) => (
      <XStack
        style={[
          styles.badge,
          {
            backgroundColor: isAlgorithm ? colors.primary : colors.tint,
          },
        ]}
      >
        <Text style={styles.badgeText}>
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
            backgroundColor: colors.pressable,
          },
        ]}
      >
        <Card.Header padded>
          <YStack gap={8}>
            <XStack style={styles.cardHeader}>
              <H2 style={{ color: colors.text }}>Result: {item.result}</H2>
              <XStack gap={8}>
                <StatusBadge success={item.correct} />
                <TypeBadge isAlgorithm={item.algoGenerated} />
              </XStack>
            </XStack>

            <YStack
              style={[
                styles.gridDataContainer,
                {
                  backgroundColor: colors.pressableActive,
                },
              ]}
            >
              <Text style={[styles.gridDataText, { color: colors.text }]}>
                [{item.gridData}]
              </Text>
            </YStack>
          </YStack>
        </Card.Header>

        <Card.Footer padded>
          <XStack style={styles.cardFooter}>
            <Text style={{ color: colors.tabIconDefault }}>ID: {item.id}</Text>
            <AlertDialog>
              <AlertDialog.Trigger asChild>
                <Button size='$3' variant='outlined'>
                  Edit
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay
                  key='overlay'
                  animation='unset'
                  opacity={1}
                />
                <AlertDialog.Content>
                  <YStack gap='$3'>
                    <XStack justifyContent='space-between' alignItems='center'>
                      <AlertDialog.Title>Actions</AlertDialog.Title>
                      <AlertDialog.Cancel asChild>
                        <Button
                          variant='outlined'
                          icon={
                            <IconSymbol
                              name='xmark'
                              size={20}
                              color={colors.text}
                            />
                          }
                        />
                      </AlertDialog.Cancel>
                    </XStack>
                    <AlertDialog.Description>
                      Choose an action for this solution
                    </AlertDialog.Description>

                    <XStack gap='$3' justifyContent='flex-end'>
                      <AlertDialog.Action asChild>
                        <Button
                          variant='outlined'
                          color='red'
                          onPress={() => {
                            console.log('item.id', item.id);
                            handleDeleteSolutionbyId(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </AlertDialog.Action>
                      <AlertDialog.Action asChild>
                        <Button
                          theme='active'
                          onPress={() => {
                            console.log('item.id', item.id);
                            router.push(`/solutions/${item.id}`);
                          }}
                        >
                          Update
                        </Button>
                      </AlertDialog.Action>
                    </XStack>
                  </YStack>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog>
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

  if (!solutions.length || error) {
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
      <XStack style={styles.headerActions}>
        <AlertDialog>
          <AlertDialog.Trigger asChild>
            <Button
              variant='outlined'
              color='red'
              size='$1'
              icon={<IconSymbol name='trash' size={20} color={colors.error} />}
            />
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay key='overlay' animation='unset' opacity={1} />
            <AlertDialog.Content>
              <YStack gap='$3'>
                <XStack justifyContent='space-between' alignItems='center'>
                  <AlertDialog.Title>Delete All Solutions</AlertDialog.Title>
                  <AlertDialog.Cancel asChild>
                    <Button
                      variant='outlined'
                      icon={
                        <IconSymbol
                          name='xmark'
                          size={20}
                          color={colors.text}
                        />
                      }
                    />
                  </AlertDialog.Cancel>
                </XStack>
                <AlertDialog.Description>
                  Are you sure you want to delete all solutions?
                </AlertDialog.Description>

                <XStack gap='$3' justifyContent='flex-end'>
                  <AlertDialog.Action asChild>
                    <Button
                      color='red'
                      variant='outlined'
                      onPress={handleDeleteAllSolutions}
                    >
                      Delete All
                    </Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </XStack>
      <FlatList
        style={styles.list}
        data={solutions}
        renderItem={renderSolutionCard}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
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
  headerActions: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  solutionCard: {
    marginVertical: 8,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  cardHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: Colors.light.background,
    fontSize: 14,
  },
  gridDataContainer: {
    padding: 12,
    borderRadius: 8,
  },
  gridDataText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  list: {
    width: '100%',
    marginBottom: 80,
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
