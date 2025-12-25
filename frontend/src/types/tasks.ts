import type { Point } from "geojson";

export type TaskRow = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
  finished_at: Date | null;
  location: string;
};

export type TaskDTO = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  location: Point; // GeoJSON Point
  createdAt: string;
  updatedAt: string;
  finishedAt?: string | null;
};

export type NearbyTaskRow = TaskRow & { distance: number };

export type NearbyTaskDTO = TaskDTO & { distance: number };

export const TaskStatusEnum = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
} as const;

export type TaskStatus = (typeof TaskStatusEnum)[keyof typeof TaskStatusEnum];

export const TaskStatusValues = Object.values(TaskStatusEnum) as TaskStatus[];