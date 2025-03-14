import { API_ROUTES } from '../index';

export async function getSolutions() {
  const response = await fetch(`${API_ROUTES.SOLUTIONS.GET}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch solutions');
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
    throw new Error('Failed to create solution');
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
    throw new Error('Failed to delete solution');
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
    throw new Error('Failed to delete all solutions');
  }

  return true;
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
    throw new Error('Failed to update solution');
  }

  return response.json();
}
