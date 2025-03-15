import { XStack, YStack, AlertDialog, Button } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles } from '@/styles/screens/solutions';

export function DeleteAllSolutions({
  handleDeleteAllSolutions,
}: {
  handleDeleteAllSolutions: () => void;
}) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  return (
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
                      <IconSymbol name='xmark' size={20} color={colors.text} />
                    }
                  />
                </AlertDialog.Cancel>
              </XStack>
              <AlertDialog.Description>
                Are you sure you want to delete all solutions?
              </AlertDialog.Description>

              <XStack gap='$3' justifyContent='flex-end'>
                <AlertDialog.Action asChild>
                  <Button color='red' onPress={handleDeleteAllSolutions}>
                    Yes I want to delete all solutions
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </XStack>
  );
}
