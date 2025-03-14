/**
 * Error messages for the app
 * t: title
 * m: message
 */
export const ErrorMessage = {
  ALREADY_IN_GRID: {
    t: 'Error',
    m: 'Number already in grid',
  },
  INVALID_NUMBER: {
    t: 'Error',
    m: 'Please enter a number between 1 and 9',
  },
  CALCULATION: {
    t: 'Info',
    m: 'Calculation not yet implemented',
  },
  WARNING: {
    t: 'Warning',
    m: 'Please complete the grid',
  },
  INVALID_RANGE: {
    t: 'Error',
    m: 'All numbers must be between 1 and 9',
  },
  DUPLICATE_NUMBERS: {
    t: 'Error',
    m: 'Each number can only be used once',
  },
  SUBMISSION_ERROR: {
    t: 'Error',
    m: 'Failed to submit solution',
  },
};

export const InfoMessage = {
  SUCCESS: {
    t: 'Success',
    m: 'Solution is correct',
  },
  FALSE: {
    t: 'False',
    m: 'Solution is not correct',
  },
};
