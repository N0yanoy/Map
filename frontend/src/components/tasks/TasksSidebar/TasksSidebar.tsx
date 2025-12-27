import { Badge, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { TaskStatusValues, type TaskDTO, type TaskStatus } from "../../../types/tasks";
import { statusColorMap, statusLabel } from "../taskStatus";
import { useTasksStore } from "../../../store/tasksStore";
import { useUpdateTaskStatus } from "../../../api/hooks/useUpdateTaskStatus";
import { useDeleteTask } from "../../../api/hooks/useDeleteTask";
import { SidebarShell, SidebarColumn, SidebarSection, SidebarPillButton,
} from "./TasksSidebar.styles";
import { TaskCard } from "./TaskCard";

type Props = {
  tasks: TaskDTO[];
  isLoading: boolean;
  isError: boolean;
};

const groupsOrder: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

export const TasksSidebar = ({ tasks, isLoading, isError }: Props) => {
  const { setFocusedTask } = useTasksStore();
  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const [searchText, setSearchText] = useState("");
  const [selectedStatuses, setSelectedStatuses] =
    useState<TaskStatus[]>(TaskStatusValues);

  const toggleStatus = (status: TaskStatus) => {
    setSelectedStatuses((previousStatuses) =>
      previousStatuses.includes(status)
        ? previousStatuses.filter(
            (existingStatus) => existingStatus !== status
          )
        : [...previousStatuses, status]
    );
  };

  const selectAllStatuses = () => {
    setSelectedStatuses([...groupsOrder]);
  };

  const clearStatuses = () => {
    setSelectedStatuses([]);
  };

  if (isLoading) return <SidebarShell>טוען משימות… ⏳</SidebarShell>;
  if (isError) return <SidebarShell>שגיאה בטעינה ❌</SidebarShell>;

  const filteredTasks = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      if (!selectedStatuses.includes(task.status)) return false;

      if (!normalizedSearchText) return true;

      return (
        task.title.toLowerCase().includes(normalizedSearchText) ||
        (task.description ?? "")
          .toLowerCase()
          .includes(normalizedSearchText)
      );
    });
  }, [tasks, searchText, selectedStatuses]);

  const groupedTasks = useMemo(() => {
    const map = new Map<TaskStatus, TaskDTO[]>();

    for (const status of groupsOrder) {
      map.set(status, []);
    }

    for (const task of filteredTasks) {
      map.get(task.status)?.push(task);
    }

    return map;
  }, [filteredTasks]);

  const setStatus = (id: string, status: TaskStatus) => {
    updateTaskStatus.mutate({ id, status });
  };

  const remove = (id: string) => {
    deleteTask.mutate(id);
  };

  const allSelected = selectedStatuses.length === groupsOrder.length;

  return (
    <SidebarShell p="3" dir="rtl">
      <SidebarColumn>
        <Text size="5" weight="bold">
          משימות
        </Text>

        <TextField.Root
          placeholder="חיפוש…"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          radius="full"
        />

        {/* Status filters */}
        <SidebarSection>
          <Flex direction="column" gap="2">
            <Flex gap="2" wrap="wrap">
              <SidebarPillButton
                size="1"
                variant={allSelected ? "solid" : "soft"}
                color="gray"
                onClick={selectAllStatuses}
              >
                הכל
              </SidebarPillButton>

              <SidebarPillButton
                size="1"
                variant="soft"
                color="gray"
                onClick={clearStatuses}
                disabled={selectedStatuses.length === 0}
              >
                נקה
              </SidebarPillButton>
            </Flex>

            <Flex gap="2" wrap="wrap">
              {groupsOrder.map((status) => {
                const isActive = selectedStatuses.includes(status);

                return (
                  <SidebarPillButton
                    key={status}
                    size="1"
                    radius="full"
                    variant={isActive ? "solid" : "soft"}
                    color={statusColorMap[status]}
                    onClick={() => toggleStatus(status)}
                  >
                    {statusLabel[status]}
                  </SidebarPillButton>
                );
              })}
            </Flex>

            {selectedStatuses.length === 0 && (
              <Text size="2" color="gray">
                לא נבחרו סטטוסים — בחרי לפחות אחד כדי לראות משימות.
              </Text>
            )}
          </Flex>
        </SidebarSection>

        <Separator size="4" />

        {/* Groups by status */}
        {groupsOrder.map((status) => {
          if (!selectedStatuses.includes(status)) return null;

          const list = groupedTasks.get(status) ?? [];

          return (
            <SidebarSection key={status}>
              <Flex align="center" gap="2" mb="2">
                <Badge color={statusColorMap[status]} radius="full">
                  {statusLabel[status]}
                </Badge>
                <Text size="2" color="gray">
                  ({list.length})
                </Text>
              </Flex>

              <Flex direction="column" gap="2">
                {list.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onSelect={() => setFocusedTask(task)}
                    onSetStatus={(status) => setStatus(task.id, status)}
                    onDelete={() => remove(task.id)}
                  />
                ))}

                {list.length === 0 && (
                  <Text size="2" color="gray">
                    אין משימות בקטגוריה הזו
                  </Text>
                )}
              </Flex>

              <Separator size="4" my="3" />
            </SidebarSection>
          );
        })}
      </SidebarColumn>
    </SidebarShell>
  );
};
