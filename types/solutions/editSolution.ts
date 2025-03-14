import { Solution } from '@/types/solutions/solutions';

export interface UseEditSolutionReturn {
  error: string | null;
  solution: Solution | null;
  gridData: string;
  validationError: string | null;
  // eslint-disable-next-line no-unused-vars
  handleGridDataChange: (text: string) => void;
  handleUpdate: () => Promise<void>;
  handleCancel: () => void;
}
