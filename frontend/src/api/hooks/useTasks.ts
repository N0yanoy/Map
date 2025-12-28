import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../tasks";
import type { TaskDTO } from "../../types/tasks";

export const tasksKeys = {
  all: ["tasks"] as const,
};

export const useTasks = () => {
  return useQuery<TaskDTO[], Error>({
    queryKey: tasksKeys.all,
    queryFn: getTasks,
  });
};