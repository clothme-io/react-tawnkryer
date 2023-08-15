import { create } from 'zustand';

import { AccountSlice, createAccountSlice } from './accountSlice';
import { ProjectSlice, createProjectSlice } from './projectSlice';
import { EntitySlice, createEntitySlice } from './entity';

type StoreState = AccountSlice & ProjectSlice & EntitySlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAccountSlice(...a),
  ...createProjectSlice(...a),
  ...createEntitySlice(...a),
}));
