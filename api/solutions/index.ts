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

export async function deleteSolutionById(id: string) {
  const response = await fetch(
    `${API_ROUTES.SOLUTIONS.DELETE_BY_ID.replace(':id', id)}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la solution');
  }

  return true;
}

export async function deleteAllSolutions() {
  const response = await fetch(`${API_ROUTES.SOLUTIONS.DELETE}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de toutes les solutions');
  }

  return response.text().then((text) => (text ? JSON.parse(text) : {}));
}

export async function updateSolutionById(
  id: string,
  solution: { gridData: number[] }
) {
  const response = await fetch(`${API_ROUTES.SOLUTIONS.PUT}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(solution),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de la solution');
  }

  return response.json();
}
