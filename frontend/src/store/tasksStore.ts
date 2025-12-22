import { create } from "zustand";
import { type TaskDTO } from "../types/tasks"

type TasksState = {
  selectedTask: TaskDTO | null;
  selectTask: (task: TaskDTO | null) => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  selectedTask: null,
  selectTask: (task) => set({ selectedTask: task }),
}));
