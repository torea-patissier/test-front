import { Card, H2, XStack, YStack, Text, Button, AlertDialog } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '@/styles/screens/solutions';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { useCallback } from 'react';
import { RenderSolutionCardProps } from '@/types/solutions/solutions';

export function RenderSolutionCard({
  item,
  colors,
  handleDeleteSolutionbyId,
  handleUpdateSolution,
}: RenderSolutionCardProps) {
  const renderCard = useCallback(
    () => (
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
                            handleDeleteSolutionbyId(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </AlertDialog.Action>
                      <AlertDialog.Action asChild>
                        <Button
                          theme='active'
                          style={styles.updateButton}
                          onPress={() => handleUpdateSolution(item.id)}
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
    [colors, item, handleDeleteSolutionbyId, handleUpdateSolution]
  );

  return renderCard();
}
