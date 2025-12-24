import type { TaskStatus } from "../../types/tasks";

export const statusLabel: Record<TaskStatus, string> = {
  TODO: "לביצוע",
  IN_PROGRESS: "בתהליך",
  DONE: "בוצע",
  CANCELLED: "בוטל",
};

// For Radix Badge/Button colors (Radix tokens)
export const statusColorMap: Record<
  TaskStatus,
  "gray" | "blue" | "green" | "crimson" | "orange"
> = {
  TODO: "gray",
  IN_PROGRESS: "blue",
  DONE: "green",
  CANCELLED: "crimson",
};
