import { Colors } from '@/constants/Colors';

export interface Solution {
  id: string;
  gridData: string;
  result: number;
  algoGenerated: boolean;
  correct: boolean;
}

export interface RenderSolutionCardProps {
  item: Solution;
  colors: (typeof Colors)['light'];
  // eslint-disable-next-line no-unused-vars
  handleDeleteSolutionbyId: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleUpdateSolution: (id: string) => void;
}
