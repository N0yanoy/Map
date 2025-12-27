import { create } from "zustand";
import type { TaskDTO } from "../types/tasks";

type Coords = { lng: number; lat: number };

type TasksState = {
  focusedTask: TaskDTO | null;
  newTaskLocation: Coords | null;

  setFocusedTask: (task: TaskDTO | null) => void;
  openNewTaskDialog: (coords: Coords) => void;
  closeNewTaskDialog: () => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  focusedTask: null,
  newTaskLocation: null,

  setFocusedTask: (task) => set({ focusedTask: task }),
  openNewTaskDialog: (coords) => set({ newTaskLocation: coords }),
  closeNewTaskDialog: () => set({ newTaskLocation: null }),
}));
