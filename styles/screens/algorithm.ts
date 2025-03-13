import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const createStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    errorText: {
      color: Colors[colorScheme].error,
      fontSize: 16,
      textAlign: 'center',
    },
    responseContainer: {
      width: '100%',
      padding: 10,
    },
    responseText: {
      fontSize: 16,
      textAlign: 'center',
      color: Colors[colorScheme].text,
    },
    codeBlock: {
      fontSize: 14,
      textAlign: 'left',
      color: Colors[colorScheme].text,
    },
  });
