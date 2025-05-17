
import { atom } from 'recoil';

export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const isAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});
