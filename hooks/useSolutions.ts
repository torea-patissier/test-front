import { useState, useCallback } from 'react';
import {
  getSolutions,
  deleteSolutionById,
  deleteAllSolutions,
} from '@/api/solutions';
import { Solution } from '@/types/solutions/solutions';
import { router } from 'expo-router';

interface UseSolutionsReturn {
  solutions: Solution[];
  error: string | null;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDeleteSolution: (id: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  handleUpdateSolution: (id: string) => void;
  handleDeleteAllSolutions: () => Promise<void>;
  fetchSolutions: () => Promise<void>;
}

export const useSolutions = (): UseSolutionsReturn => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteSolution = useCallback(async (id: string) => {
    try {
      await deleteSolutionById(id);
      setSolutions((prevSolutions) =>
        prevSolutions.filter((solution) => solution.id !== id)
      );
    } catch (err) {
      console.error('Error deleting solution:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to delete solution'
      );
    }
  }, []);

  const handleDeleteAllSolutions = useCallback(async () => {
    try {
      await deleteAllSolutions();
      setSolutions([]);
    } catch (err) {
      console.error('Error deleting all solutions:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to delete all solutions'
      );
    }
  }, []);

  const handleUpdateSolution = useCallback((id: string) => {
    router.push(`/solutions/${id}`);
  }, []);

  const fetchSolutions = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getSolutions();
      setSolutions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    solutions,
    error,
    isLoading,
    handleDeleteSolution,
    handleDeleteAllSolutions,
    handleUpdateSolution,
    fetchSolutions,
  };
};
