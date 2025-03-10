import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function Button({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{children}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
