// frontend/src/api/tasks.ts
import axiosClient from "./axiosClient";
import { type TaskDTO, type NearbyTaskDTO } from "../types/tasks";
import { TaskStatus } from "../../../backend/src/generated/prisma/enums";

export const getTasks = async (status?: TaskStatus) => {
  const params = status ? { status } : {};
  const { data } = await axiosClient.get<TaskDTO[]>("/tasks", { params });
  return data;
};

export const getTaskById = async (id: string) => {
  const { data } = await axiosClient.get<TaskDTO>(`/tasks/${id}`);
  return data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  location: { type: "Point"; coordinates: [number, number] };
}) => {
  const { data } = await axiosClient.post<TaskDTO>("/tasks", task);
  return data;
};

export const updateTaskStatus = async (id: string, status: TaskStatus) => {
  const { data } = await axiosClient.patch<TaskDTO>(`/tasks/${id}/status`, { status });
  return data;
};

export const updateTaskLocation = async (id: string, location: { type: "Point"; coordinates: [number, number] }) => {
  const { data } = await axiosClient.patch<TaskDTO>(`/tasks/${id}/location`, { location });
  return data;
};

export const getNearbyTasks = async (location: { type: "Point"; coordinates: [number, number] }, radius: number) => {
  const { data } = await axiosClient.get<NearbyTaskDTO[]>("/tasks/nearby", {
    params: { location: JSON.stringify(location), radius },
  });
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await axiosClient.delete(`/tasks/${id}`);
  return data;
};
