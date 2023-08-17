import { StateCreator } from 'zustand';
import { AccountModel } from './model/accountModel';

export interface AccountSlice {
  account: AccountModel;
  addAccount: (input: any) => void;
  signOut: () => void;
}

export const createAccountSlice: StateCreator<AccountSlice> = (set) => ({
  account: { id: '', email: '' },
  addAccount: (input: AccountModel) => {
    set({ account: input });
  },
  signOut() {
    set({ account: { id: '', email: '' } });
  },
});
