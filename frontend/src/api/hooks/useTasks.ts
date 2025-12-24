import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../tasks";
import type { TaskDTO, TaskStatus } from "../../types/tasks";

export const tasksKeys = {
  all: ["tasks"] as const,
  list: (status?: TaskStatus) => ["tasks", "list", status] as const,
};

export const useTasks = (status?: TaskStatus) => {
  return useQuery<TaskDTO[], Error>({
    queryKey: tasksKeys.list(status),
    queryFn: () => getTasks(status),
  });
};