import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../tasks";
import { tasksKeys } from "./useTasks";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteTask(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};