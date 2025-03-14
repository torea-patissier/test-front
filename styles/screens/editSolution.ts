import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 8,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 16,
  },
});
