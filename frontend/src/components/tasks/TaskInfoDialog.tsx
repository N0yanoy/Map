import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Text, Badge, Button, Separator } from "@radix-ui/themes";
import type { TaskDTO, TaskStatus } from "../../types/tasks";
import { statusColorMap, statusLabel } from "./taskStatus";
import { Content, Overlay } from "./dialogStyles";
import { useUpdateTaskStatus } from "../../api/hooks/useUpdateTaskStatus";
import { useDeleteTask } from "../../api/hooks/useDeleteTask";

type Props = {
  task: TaskDTO | null;
  onClose: () => void;
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("he-IL");
};

export const TaskInfoDialog = ({ task, onClose }: Props) => {
  const open = !!task;

  const updateStatus = useUpdateTaskStatus();
  const del = useDeleteTask();

  const setStatus = (status: TaskStatus) => {
    if (!task) return;
    updateStatus.mutate({ id: task.id, status }, { onSuccess: onClose });
  };

  const onDelete = () => {
    if (!task) return;
    del.mutate(task.id, { onSuccess: onClose });
  };

  const coords = task?.location?.coordinates;
  const lng = coords?.[0];
  const lat = coords?.[1];

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          {task && (
            <Flex direction="column" gap="4" dir="rtl">
              <Flex justify="between" align="start" gap="3">
                <Box>
                  <Text size="5" weight="bold">{task.title}</Text>
                  <Flex gap="2" align="center" mt="2" wrap="wrap">
                    <Badge color={statusColorMap[task.status]} radius="full">
                      {statusLabel[task.status]}
                    </Badge>
                  </Flex>
                </Box>

                <Dialog.Close asChild>
                  <Button radius="full" variant="soft" color="gray">סגור</Button>
                </Dialog.Close>
              </Flex>

              <Separator size="4" />

              <Box style={{ background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: 12 }}>
                <Text size="3">{task.description?.trim() || "אין תיאור"}</Text>
              </Box>

              <Flex gap="3" wrap="wrap">
                <Box style={{ flex: "1 1 220px" }}>
                  <Text size="2" color="gray">נוצר</Text>
                  <Text size="3">{formatDateTime(task.createdAt)}</Text>
                </Box>

                <Box style={{ flex: "1 1 220px" }}>
                  <Text size="2" color="gray">עודכן</Text>
                  <Text size="3">{formatDateTime(task.updatedAt)}</Text>
                </Box>

                <Box style={{ flex: "1 1 220px" }}>
                  <Text size="2" color="gray">הסתיים</Text>
                  <Text size="3">{formatDateTime(task.finishedAt)}</Text>
                </Box>

                <Box style={{ flex: "1 1 220px" }}>
                  <Text size="2" color="gray">מיקום</Text>
                  <Text size="3">
                    {typeof lat === "number" && typeof lng === "number"
                      ? `(${lat.toFixed(5)}, ${lng.toFixed(5)})`
                      : "—"}
                  </Text>
                </Box>
              </Flex>

              <Flex justify="between" align="center" mt="2" gap="2" wrap="wrap">
                <Flex gap="2" wrap="wrap">
                  {task.status !== "DONE" && (
                    <Button radius="full" color="green" onClick={() => setStatus("DONE")}>
                      סמן כבוצע
                    </Button>
                  )}

                  {task.status !== "CANCELLED" && (
                    <Button radius="full" variant="soft" color="crimson" onClick={() => setStatus("CANCELLED")}>
                      בטל משימה
                    </Button>
                  )}
                </Flex>

                <Button radius="full" variant="solid" color="crimson" onClick={onDelete}>
                  מחיקה
                </Button>
              </Flex>
            </Flex>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};