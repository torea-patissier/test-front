import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/screens/solutions';
import { useCallback } from 'react';
import { XStack, Text } from 'tamagui';

export function TypeBadge({ isAlgorithm }: { isAlgorithm: boolean }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderTypeBadge = useCallback(
    () => (
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
  return renderTypeBadge();
}
