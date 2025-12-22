import { Point } from "geojson";
import { TaskStatus } from "src/generated/prisma/enums";

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
  description?: string;
  status: TaskStatus;
  location: Point;
  createdAt: Date;
  updatedAt: Date;
  finishedAt?: Date;
};

export type NearbyTaskRow = TaskRow & { distance: number };

export type NearbyTaskDTO = TaskDTO & { distance: number };