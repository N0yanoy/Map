import { useQuery } from "@tanstack/react-query";
import { type TaskDTO } from "../../types/tasks";
import { getTasks } from "../tasks";
import type { TaskStatus } from "../../../../backend/src/generated/prisma/enums";

export const useTasks = (status?: TaskStatus) => {
  return useQuery<TaskDTO[], Error>({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });
};
