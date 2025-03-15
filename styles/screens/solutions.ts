import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerActions: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  solutionCard: {
    marginVertical: 8,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  cardHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: Colors.light.background,
    fontSize: 14,
  },
  gridDataContainer: {
    padding: 12,
    borderRadius: 8,
  },
  gridDataText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  list: {
    width: '100%',
    marginBottom: Platform.select({
      ios: 80,
      default: 0,
    }),
  },
  listContent: {
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: Colors.light.tint,
    color: Colors.light.background,
  },
});
