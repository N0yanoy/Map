import axiosClient from "./axiosClient";
import type { Point } from "geojson";
import type { TaskDTO, NearbyTaskDTO, TaskStatus } from "../types/tasks";

export const getTasks = async () => {
  const { data } = await axiosClient.get<TaskDTO[]>("/tasks");
  return data;
};

export const getTaskById = async (id: string) => {
  const { data } = await axiosClient.get<TaskDTO>(`/tasks/${id}`);
  return data;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  location: Point;
};

export const createTask = async (task: CreateTaskInput) => {
  const { data } = await axiosClient.post<TaskDTO>("/tasks", task);
  return data;
};

export const updateTaskStatus = async (id: string, status: TaskStatus) => {
  const { data } = await axiosClient.patch<TaskDTO>(`/tasks/${id}/status`, { status });
  return data;
};

export const updateTaskLocation = async (id: string, location: Point) => {
  const { data } = await axiosClient.patch<TaskDTO>(`/tasks/${id}/location`, { location });
  return data;
};

export const getNearbyTasks = async (location: Point, radius: number) => {
  const { data } = await axiosClient.get<NearbyTaskDTO[]>("/tasks/nearby", {
    params: { location: JSON.stringify(location), radius },
  });
  return data;
};

export const deleteTask = async (id: string) => {
  await axiosClient.delete(`/tasks/${id}`);
};