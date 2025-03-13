import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const createStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: Colors[colorScheme].background,
    },
    gridHeader: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      padding: 16,
      borderRadius: 8,
      backgroundColor: Colors[colorScheme].pressable,
    },
    gridHeaderText: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors[colorScheme].text,
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 8,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      gap: 2,
    },
    grid: {
      flexDirection: 'column',
      gap: 2,
      padding: 8,
      borderRadius: 8,
      backgroundColor: Colors[colorScheme].pressable,
    },
    nullCell: {
      width: 50,
      height: 50,
      backgroundColor: Colors[colorScheme].pressableActive,
      borderRadius: 4,
    },
    cell: {
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      backgroundColor: Colors[colorScheme].background,
      width: 50,
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[colorScheme].text,
      borderRadius: 4,
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: 12,
      marginTop: 24,
      width: '100%',
    },
  });
