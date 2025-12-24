import { create } from "zustand";
import type { TaskDTO } from "../types/tasks";

type Coords = { lng: number; lat: number };

type TasksState = {
  selectedTask: TaskDTO | null;
  createCoords: Coords | null;

  selectTask: (task: TaskDTO | null) => void;
  openCreateAt: (coords: Coords) => void;
  closeCreate: () => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  selectedTask: null,
  createCoords: null,

  selectTask: (task) => set({ selectedTask: task }),
  openCreateAt: (coords) => set({ createCoords: coords }),
  closeCreate: () => set({ createCoords: null }),
}));
