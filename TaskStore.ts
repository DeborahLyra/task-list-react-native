import create from 'zustand';
import 'react-native-get-random-values';
//import { nanoid } from 'nanoid/non-secure';
import { api } from './app/api';


type Item = {
  id: number,
  title: string,
  description: string,
  step: string, 

}

type TaskStore = {
  tasks: Item[],
  addTask: (title: string, description: string, step: string) => void,
  removeTask: (id: number) => void,
  setTasks: (tasks: Item[]) => void,
  getTasks: () => void,
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: async (title, description, step) => {
    const newTask = { title, description, step };
    try {
      const response = await api.post('/tasks', newTask); //faz o post, para o id seja gerado, depois que passa para uma const e add ela no []
      const addedTask = response.data; 
      set(state => ({
        tasks: [...state.tasks, addedTask]
      }));
    } catch (error) {
      console.error(error);
    }
  },
  removeTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      console.log("delete")
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error) {
      console.error(error);
    }
  },
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

