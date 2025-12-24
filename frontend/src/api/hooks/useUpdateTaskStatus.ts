import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "../tasks";
import type { TaskDTO, TaskStatus } from "../../types/tasks";
import { tasksKeys } from "./useTasks";

type Vars = { id: string; status: TaskStatus };

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskDTO, Error, Vars>({
    mutationFn: ({ id, status }) => updateTaskStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};