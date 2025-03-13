import { API_ROUTES } from '../index';

export async function getAlgorithm() {
  const response = await fetch(`${API_ROUTES.ALGORITHMS.GET}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch algorithm');
  }

  return response.json();
}
