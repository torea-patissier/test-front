import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card, H2, XStack, YStack, Text, Button, Input } from 'tamagui';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useEditSolution } from '@/hooks/useEditSolution';
import { createStyles } from '@/styles/screens/editSolution';

export default function EditSolutionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const styles = createStyles();
  const {
    error,
    solution,
    gridData,
    validationError,
    handleGridDataChange,
    handleUpdate,
    handleCancel,
  } = useEditSolution({ id });

  if (!solution || error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>
          {error || 'Solution not found'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card
        elevate
        size='$4'
        bordered
        style={[styles.card, { backgroundColor: colors.background }]}
      >
        <Card.Header padded>
          <XStack style={styles.headerContainer}>
            <H2 style={[styles.headerTitle, { color: colors.text }]}>
              Edit Solution
            </H2>
            <Button
              variant='outlined'
              icon={<IconSymbol name='xmark' size={20} color={colors.text} />}
              onPress={handleCancel}
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
                onChangeText={handleGridDataChange}
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
                style={[styles.cancelButton, { borderColor: colors.border }]}
                variant='outlined'
                onPress={handleCancel}
              >
                <Text style={[styles.buttonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </Button>
              <Button
                style={[
                  styles.updateButton,
                  {
                    backgroundColor: validationError
                      ? colors.tabIconDefault
                      : colors.tint,
                    opacity: validationError ? 0.5 : 1,
                  },
                ]}
                theme='active'
                onPress={handleUpdate}
                disabled={!!validationError}
              >
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Update
                </Text>
              </Button>
            </XStack>
          </YStack>
        </Card.Footer>
      </Card>
    </View>
  );
}
