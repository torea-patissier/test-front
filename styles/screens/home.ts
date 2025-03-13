import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gridHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridHeaderText: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
  },
  grid: {
    flexDirection: 'column',
  },
  nullCell: {
    width: 50,
    height: 50,
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    // lineHeight: 50
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
});
