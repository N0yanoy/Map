import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, type CreateTaskInput } from "../tasks";
import type { TaskDTO } from "../../types/tasks";
import { tasksKeys } from "./useTasks";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskDTO, Error, CreateTaskInput>({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};
