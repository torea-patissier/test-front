import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from 'tamagui';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '@/styles/screens/solutions';
import { useSolutions } from '@/hooks/useSolutions';
import { useCallback } from 'react';
import { DeleteAllSolutions } from '@/components/solutions/DeleteAllSolutions';
import { RenderSolutionCard } from '@/components/solutions/RenderSolutionCard';

export default function SolutionsScreen() {
  const {
    solutions,
    error,
    isLoading,
    handleDeleteSolution: handleDeleteSolutionbyId,
    handleDeleteAllSolutions,
    handleUpdateSolution,
    fetchSolutions,
  } = useSolutions();

  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useFocusEffect(
    useCallback(() => {
      fetchSolutions();
    }, [fetchSolutions])
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
      <DeleteAllSolutions handleDeleteAllSolutions={handleDeleteAllSolutions} />
      <FlatList
        style={styles.list}
        data={solutions}
        renderItem={({ item }) => (
          <RenderSolutionCard
            item={item}
            colors={colors}
            handleDeleteSolutionbyId={handleDeleteSolutionbyId}
            handleUpdateSolution={handleUpdateSolution}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
