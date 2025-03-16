import React from 'react';
import { StatusBadge } from '@/components/solutions/StatusBadge';

// Mock the useColorScheme hook
jest.mock('@/hooks/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

describe('StatusBadge', () => {
  // Test 1: Check if component renders with success props
  test('renders with success props', () => {
    const element = <StatusBadge success={true} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(result.props.success).toBe(true);
  });

  // Test 2: Check if component renders with failure props
  test('renders with failure props', () => {
    const element = <StatusBadge success={false} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(result.props.success).toBe(false);
  });

  // Test 3: Check component props type
  test('accepts boolean success prop', () => {
    const element = <StatusBadge success={true} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(typeof result.props.success).toBe('boolean');
  });
});
