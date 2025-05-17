
import { atom, selector } from 'recoil';
import { selectedProjectIdState } from './projectsAtom';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  createdAt: string;
  completedAt: string | null;
}

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
});

export const filteredTasksState = selector({
  key: 'filteredTasksState',
  get: ({ get }) => {
    const tasks = get(tasksState);
    const selectedProjectId = get(selectedProjectIdState);
    
    if (!selectedProjectId) return [];
    
    return tasks.filter(task => task.projectId === selectedProjectId);
  },
});
