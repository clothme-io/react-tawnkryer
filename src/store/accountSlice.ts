import { StateCreator } from 'zustand';

export interface Account {
  //   category: {
  //     id: number
  //     image: string
  //     name: string
  //   }
  //   description: string
  id: string;
  //   images: string[]
  email: string;
  //   title: string
  //   quantity?: number
}

export interface AccountSlice {
  account: Account;
  addAccount: (input: any) => void;
  signOut: () => void;
}

export const createAccountSlice: StateCreator<AccountSlice> = (set) => ({
  account: { id: '', email: '' },
  addAccount: (input: any) => {
    set({ account: input });
  },
  signOut() {
    set({ account: { id: '', email: '' } });
  },
});
