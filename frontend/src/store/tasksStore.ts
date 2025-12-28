import { create } from "zustand";
import type { TaskDTO } from "../types/tasks";

type Coords = { lng: number; lat: number };

type TasksState = {
  activeTask: TaskDTO | null;
  newTaskCoords: Coords | null;

  setActiveTask: (task: TaskDTO | null) => void;
  setTaskCoords: (coords: Coords) => void;
  closeNewTaskDialog: () => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  activeTask: null,
  newTaskCoords: null,

  setActiveTask: (task) => set({ activeTask: task }),
  setTaskCoords: (coords) => set({ newTaskCoords: coords }),
  closeNewTaskDialog: () => set({ newTaskCoords: null }),
}));
