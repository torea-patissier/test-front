import { API_URL, API_ROUTES } from './index';

export const getSolutions = async () => {
  const response = await fetch(`${API_URL}${API_ROUTES.SOLUTIONS.GET}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des solutions');
  }

  return response.json();
};
