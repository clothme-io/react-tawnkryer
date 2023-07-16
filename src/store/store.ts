import { create } from 'zustand';

import { AccountSlice, createAccountSlice } from './accountSlice';
import { ProjectSlice, createProjectSlice } from './projectSlice';

type StoreState = AccountSlice & ProjectSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAccountSlice(...a),
  ...createProjectSlice(...a),
}));
