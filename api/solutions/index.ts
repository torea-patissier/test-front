import { API_ROUTES } from '../index';

export async function getSolutions() {
  const response = await fetch(`${API_ROUTES.SOLUTIONS.GET}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des solutions');
  }

  return response.json();
}

export async function postSolution(solution: { gridData: number[] }) {
  const response = await fetch(`${API_ROUTES.SOLUTIONS.POST}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(solution),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la publication de la solution');
  }
  return response.json();
}
