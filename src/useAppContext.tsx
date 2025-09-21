import { use } from 'react';
import { AppContext } from './AppProvider';

export const useAppContext = () => {
  return use(AppContext);
};
