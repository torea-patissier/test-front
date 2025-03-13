/**
 * Color palette for the app in both light and dark modes.
 * Core colors for essential UI elements and interactions.
 */

// Primary brand colors
const primaryLight = '#0A7EA4';
const primaryDark = '#60CDFF';

// Status colors
const successLight = '#22C55E';
const successDark = '#4ADE80';
const errorLight = '#DC2626';
const errorDark = '#EF4444';

// Card colors
const cardSuccessLight = '#e6ffe6';
const cardErrorLight = '#ffe6e6';
const cardSuccessDark = '#1a331a';
const cardErrorDark = '#331a1a';

export const Colors = {
  light: {
    // Core colors
    text: '#111827',
    background: '#FFFFFF',
    border: '#E5E7EB',

    // Brand colors
    primary: primaryLight,
    tint: primaryLight,

    // UI elements
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryLight,

    // Interactive states
    pressable: '#F3F4F6',
    pressableActive: '#D1D5DB',

    // Status colors
    success: successLight,
    error: errorLight,

    // Card colors
    cardSuccess: cardSuccessLight,
    cardError: cardErrorLight,
  },
  dark: {
    // Core colors
    text: '#F9FAFB',
    background: '#111827',
    border: '#374151',

    // Brand colors
    primary: primaryDark,
    tint: primaryDark,

    // UI elements
    tabIconDefault: '#6B7280',
    tabIconSelected: primaryDark,

    // Interactive states
    pressable: '#1F2937',
    pressableActive: '#4B5563',

    // Status colors
    success: successDark,
    error: errorDark,

    // Card colors
    cardSuccess: cardSuccessDark,
    cardError: cardErrorDark,
  },
};
