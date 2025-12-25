import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Separator,
  TextField,
} from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { TaskStatusValues, type TaskDTO, type TaskStatus } from "../../types/tasks";
import { statusColorMap, statusLabel } from "./taskStatus";
import { useTasksStore } from "../../store/tasksStore";
import { useUpdateTaskStatus } from "../../api/hooks/useUpdateTaskStatus";
import { useDeleteTask } from "../../api/hooks/useDeleteTask";

type Props = {
  tasks: TaskDTO[];
};

const groupsOrder: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

export const TasksSidebar = ({ tasks }: Props) => {
  const { selectTask } = useTasksStore();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const [searchText, setSearchText] = useState("");

  const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>(TaskStatusValues);

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

  const filtered = useMemo(() => {
    const normalizedSearchText  = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      // status filter
      if (!selectedStatuses.includes(task.status)) return false;

      // text filter
      if (!normalizedSearchText) return true;
      return (
        task.title.toLowerCase().includes(normalizedSearchText) ||
        (task.description ?? "").toLowerCase().includes(normalizedSearchText)
      );
    });
  }, [tasks, searchText, selectedStatuses]);

  const grouped = useMemo(() => {
    const map = new Map<TaskStatus, TaskDTO[]>();
    for (const status of groupsOrder) map.set(status, []);
    for (const task of filtered) map.get(task.status)?.push(task);
    
    return map;
  }, [filtered]);

  const setStatus = (id: string, status: TaskStatus) => {
    updateStatus.mutate({ id, status });
  };

  const remove = (id: string) => {
    deleteTask.mutate(id);
  };

  const allSelected = selectedStatuses.length === groupsOrder.length;

  return (
    <Box
      p="3"
      style={{
        width: 360,
        borderRight: "1px solid var(--gray-6)",
        background: "var(--gray-1)",
        overflow: "auto",
      }}
      dir="rtl"
    >
      <Flex direction="column" gap="3">
        <Text size="5" weight="bold">
          משימות
        </Text>

        <TextField.Root
          placeholder="חיפוש…"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          radius="full"
        />

        <Flex direction="column" gap="2">
          <Flex gap="2" wrap="wrap">
            <Button
              size="1"
              radius="full"
              variant={allSelected ? "solid" : "soft"}
              color="gray"
              onClick={selectAllStatuses}
              style={{ fontWeight: 800 }}
            >
              הכל
            </Button>

            <Button
              size="1"
              radius="full"
              variant="soft"
              color="gray"
              onClick={clearStatuses}
              style={{ fontWeight: 800 }}
              disabled={selectedStatuses.length === 0}
            >
              נקה
            </Button>
          </Flex>

          <Flex gap="2" wrap="wrap">
            {groupsOrder.map((status) => {
              const active = selectedStatuses.includes(status);

              return (
                <Button
                  key={status}
                  size="1"
                  radius="full"
                  variant={active ? "solid" : "soft"}
                  color={statusColorMap[status]}
                  onClick={() => toggleStatus(status)}
                  style={{ fontWeight: 800 }}
                >
                  {statusLabel[status]}
                </Button>
              );
            })}
          </Flex>

          {selectedStatuses.length === 0 && (
            <Text size="2" color="gray">
              לא נבחרו סטטוסים — בחרי לפחות אחד כדי לראות משימות.
            </Text>
          )}
        </Flex>

        <Separator size="4" />

        {groupsOrder.map((status) => {
          // if this status isn't selected, don't show its section at all
          if (!selectedStatuses.includes(status)) return null;

          const list = grouped.get(status) ?? [];

          return (
            <Box key={status}>
              <Flex align="center" gap="2" mb="2">
                <Badge color={statusColorMap[status]} radius="full">
                  {statusLabel[status]}
                </Badge>
                <Text size="2" color="gray">
                  ({list.length})
                </Text>
              </Flex>

              <Flex direction="column" gap="2">
                {list.map((t) => (
                  <Box
                    key={t.id}
                    p="3"
                    style={{
                      background: "white",
                      border: "1px solid var(--gray-6)",
                      borderRadius: 14,
                      cursor: "pointer",
                    }}
                    onClick={() => selectTask(t)}
                  >
                    <Flex direction="column" gap="2">
                      <Text weight="bold">{t.title}</Text>
                      <Text size="2" color="gray">
                        {t.description || "אין תיאור"}
                      </Text>

                      <Flex justify="between" align="center" mt="2">
                        <Flex gap="2">
                          {t.status === "TODO" && (
                            <>
                              <Button
                                size="1"
                                radius="full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(t.id, "IN_PROGRESS");
                                }}
                                style={{ fontWeight: 800 }}
                              >
                                התחל
                              </Button>
                              <Button
                                size="1"
                                radius="full"
                                variant="soft"
                                color="crimson"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(t.id, "CANCELLED");
                                }}
                                style={{ fontWeight: 800 }}
                              >
                                בטל
                              </Button>
                            </>
                          )}

                          {t.status === "IN_PROGRESS" && (
                            <>
                              <Button
                                size="1"
                                radius="full"
                                color="green"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(t.id, "DONE");
                                }}
                                style={{ fontWeight: 800 }}
                              >
                                סיים
                              </Button>
                              <Button
                                size="1"
                                radius="full"
                                variant="soft"
                                color="crimson"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(t.id, "CANCELLED");
                                }}
                                style={{ fontWeight: 800 }}
                              >
                                בטל
                              </Button>
                            </>
                          )}
                        </Flex>

                        {(t.status === "TODO" ||
                          t.status === "IN_PROGRESS" ||
                          t.status === "DONE") && (
                          <Button
                            size="1"
                            radius="full"
                            variant="soft"
                            color="crimson"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(t.id);
                            }}
                            style={{ fontWeight: 800 }}
                          >
                            מחיקה
                          </Button>
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                ))}

                {list.length === 0 && (
                  <Text size="2" color="gray">
                    אין משימות בקטגוריה הזו
                  </Text>
                )}
              </Flex>

              <Separator size="4" my="3" />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
