import create from 'zustand';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
import { api } from './app/api';


type Item = {
    id: string,
    title: string,
    description: string,
    step: string
}

type TaskStore = {
  tasks: Item[],
  addTask: (title: string, description: string) => void,
  removeTask: (id: string) => void,
  setTasks: (tasks: Item[]) => void,
  getTasks: () => void,
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title, description) => set(state => ({
      tasks: [...state.tasks, { id: nanoid(), title, description, step: 'Para fazer' }]
  })),
  removeTask: (id) => set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
  })),
  setTasks: (tasks) => set(() => ({
      tasks: tasks
  })),

  getTasks: async () => {
    try {
      const response = await api.get<Item[]>('/tasks');
      const filteredTasks = response.data.filter(task => task.step === "Para fazer");
      set({ tasks: filteredTasks });
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  },
}));

