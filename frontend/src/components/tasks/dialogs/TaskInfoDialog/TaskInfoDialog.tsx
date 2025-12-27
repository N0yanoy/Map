import * as Dialog from "@radix-ui/react-dialog";
import { Badge, Flex, Text } from "@radix-ui/themes";
import type { TaskDTO, TaskStatus } from "../../../../types/tasks";
import { statusColorMap, statusLabel } from "../../taskStatus";
import { Content, Overlay, DialogHeader, DialogTitle, DialogSubtitle } from "../dialogStyles";
import { useUpdateTaskStatus } from "../../../../api/hooks/useUpdateTaskStatus";
import { useDeleteTask } from "../../../../api/hooks/useDeleteTask";
import { LocationChip } from "../../LocationChip/LocationChip";
import { formatDateTimePretty } from "../../../../utils/dateFormat";
import { CloseXButton, PillButton, MutedHint } from "../../ui/TaskUi";
import { Stack, Divider, SoftCard, WhiteCard, EndRow, CenterRow } from "../../ui/taskStyles";
import { DescriptionBody, DescriptionTitle, InfoLabelText, InfoValueText } from "./TaskInfoDialog.styles";

type Props = {
  task: TaskDTO | null;
  onClose: () => void;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <Flex align="center" justify="between">
      <InfoLabelText color="gray"> {label} </InfoLabelText>
      <InfoValueText> {value} </InfoValueText>
    </Flex>
  );
};

export const TaskInfoDialog = ({ task, onClose }: Props) => {
  const isOpen = !!task;

  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const busy = updateTaskStatus.isPending || deleteTask.isPending;

  const handleSetStatus = (status: TaskStatus) => {
    if (!task) return;
    updateTaskStatus.mutate({ id: task.id, status }, { onSuccess: onClose });
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask.mutate(task.id, { onSuccess: onClose });
  };

  const longitude = task?.location?.coordinates?.[0];
  const latitude = task?.location?.coordinates?.[1];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          {task && (
            <Stack>
              <EndRow>
                <Dialog.Close asChild>
                  <CloseXButton />
                </Dialog.Close>
              </EndRow>

              {typeof latitude === "number" && typeof longitude === "number" && (
                <LocationChip lat={latitude} lng={longitude} align="center" compact={false} />
              )}

              <DialogHeader>
                <DialogTitle>{task.title}</DialogTitle>

                <Flex justify="center" align="center" wrap="wrap">
                  <Badge color={statusColorMap[task.status]}>
                    {statusLabel[task.status]}
                  </Badge>
                  <DialogSubtitle>#{task.id.slice(0, 6)}</DialogSubtitle>
                </Flex>
              </DialogHeader>

              <Divider />

              <WhiteCard>
                <DescriptionTitle  color="gray">
                  תיאור
                </DescriptionTitle>
                <DescriptionBody>
                  {task.description?.trim() || "אין תיאור"}
                </DescriptionBody>
              </WhiteCard>

              <Stack space={14}>
                <SoftCard>
                  <InfoRow label="נוצר" value={formatDateTimePretty(task.createdAt)} />
                </SoftCard>
                <SoftCard>
                  <InfoRow label="עודכן" value={formatDateTimePretty(task.updatedAt)} />
                </SoftCard>
                <SoftCard>
                  <InfoRow label="הסתיים" value={formatDateTimePretty(task.finishedAt)} />
                </SoftCard>
              </Stack>

              <Divider />

              <Flex justify="between" align="center" wrap="wrap">
                <CenterRow style={{ flex: 1 }}>
                  {task.status === "TODO" && (
                    <>
                      <PillButton variant="soft" color="blue" onClick={() => handleSetStatus("IN_PROGRESS")} disabled={busy}>
                        התחל
                      </PillButton>
                      <PillButton variant="soft" color="crimson" onClick={() => handleSetStatus("CANCELLED")} disabled={busy}>
                        בטל
                      </PillButton>
                    </>
                  )}

                  {task.status === "IN_PROGRESS" && (
                    <>
                      <PillButton size="3" variant="soft" color="green" onClick={() => handleSetStatus("DONE")} disabled={busy}>
                        סיים
                      </PillButton>
                      <PillButton size="3" variant="soft" color="red" onClick={() => handleSetStatus("CANCELLED")} disabled={busy}>
                        בטל
                      </PillButton>
                    </>
                  )}
                </CenterRow>

                {(task.status === "TODO" || task.status === "IN_PROGRESS" || task.status === "DONE") && (
                  <PillButton
                    variant="soft"
                    color="crimson"
                    onClick={handleDelete}
                    disabled={busy}
                    style={{ minWidth: 120 }}
                  >
                    מחיקה
                  </PillButton>
                )}
              </Flex>

              {busy && <MutedHint>מעדכן…</MutedHint>}
            </Stack>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
