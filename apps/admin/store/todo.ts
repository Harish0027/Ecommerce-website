import { create } from "zustand";
import { persist } from "zustand/middleware";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string, date: Date) => void;
  toggleTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, date) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, completed: false, date },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
    }),
    {
      name: "todo-storage", // key name in localStorage
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
