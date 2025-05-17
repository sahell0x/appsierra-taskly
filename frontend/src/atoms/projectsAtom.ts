
import { atom } from 'recoil';

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
}

export const projectsState = atom<Project[]>({
  key: 'projectsState',
  default: [],
});

export const selectedProjectIdState = atom<string | null>({
  key: 'selectedProjectIdState',
  default: null,
});
