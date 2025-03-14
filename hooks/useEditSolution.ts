import { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { updateSolutionById, getSolutionById } from '@/api/solutions';
import { PuzzleSolutionSchema } from '@/constants/Zod';
import { ZodError } from 'zod';
import { Solution } from '@/types/solutions';

interface UseEditSolutionReturn {
  error: string | null;
  solution: Solution | null;
  gridData: string;
  validationError: string | null;
  // eslint-disable-next-line no-unused-vars
  handleGridDataChange: (text: string) => void;
  handleUpdate: () => Promise<void>;
  handleCancel: () => void;
}

export const useEditSolution = (props: {
  id: string;
}): UseEditSolutionReturn => {
  const { id } = props;
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [gridData, setGridData] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const loadSolution = async () => {
      if (!id) return;
      try {
        const data = await getSolutionById(id);
        setSolution(data);
        setGridData(data.gridData.join(','));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    loadSolution();
  }, [id]);

  const validateGridData = useCallback((data: string): number[] | null => {
    try {
      const gridDataArray = data
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));
      const validatedData = PuzzleSolutionSchema.parse({
        gridData: gridDataArray,
      });
      setValidationError(null);
      return validatedData.gridData;
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationError(err.errors[0].message);
      } else {
        setValidationError('Invalid grid data format');
      }
      return null;
    }
  }, []);

  const handleGridDataChange = useCallback(
    (value: string) => {
      setGridData(value);
      validateGridData(value);
    },
    [validateGridData]
  );

  const handleUpdate = async () => {
    const validatedGridData = validateGridData(gridData);
    if (!validatedGridData) {
      return;
    }

    try {
      await updateSolutionById(id, { gridData: validatedGridData });
      router.back();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update solution'
      );
    }
  };

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return {
    error,
    solution,
    gridData,
    validationError,
    handleGridDataChange,
    handleUpdate,
    handleCancel,
  };
};
