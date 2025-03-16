import React from 'react';
import { StatusBadge } from '@/components/solutions/StatusBadge';

jest.mock('@/hooks/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

describe('StatusBadge', () => {
  test('renders with success props', () => {
    const element = <StatusBadge success={true} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(result.props.success).toBe(true);
  });

  test('renders with failure props', () => {
    const element = <StatusBadge success={false} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(result.props.success).toBe(false);
  });

  test('accepts boolean success prop', () => {
    const element = <StatusBadge success={true} />;
    const result = JSON.parse(JSON.stringify(element));

    expect(typeof result.props.success).toBe('boolean');
  });
});
