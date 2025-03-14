import { XStack, Text } from 'tamagui';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/screens/solutions';
import { useCallback } from 'react';

interface StatusBadgeProps {
  success: boolean;
}

export function StatusBadge({ success }: StatusBadgeProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderBadge = useCallback(
    () => (
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
    [colors, success]
  );

  return renderBadge();
}
