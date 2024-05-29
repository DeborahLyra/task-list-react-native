import create from 'zustand';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';


type Item = {
    id: string,
    title: string,
    description: string
}

type TaskStore = {
    tasks: Item[],
    addTask: (title: string, description: string) => void,
    removeTask: (id: string) => void
}

export const useTasksStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (title, description) => set(state => ({
      tasks: [...state.tasks, { id: nanoid(), title, description }]
    })),
    removeTask: (id) => set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }))
}));

