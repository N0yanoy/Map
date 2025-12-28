import { Flex, Text } from "@radix-ui/themes";
import type { TaskDTO, TaskStatus } from "../../../types/tasks";
import {
  TaskCardContainer,
  TaskActionsRow,
  TaskActionsLeft,
  SidebarPillButton,
} from "./TasksSidebar.styles";

type TaskCardProps = {
  task: TaskDTO;
  onSelect: () => void;
  onSetStatus: (status: TaskStatus) => void;
  onDelete: () => void;
};

export const TaskCard = ({ task, onSelect, onSetStatus, onDelete }: TaskCardProps) => {
  const handleClick = () => {
    onSelect();
  };

  const handleStatusClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    status: TaskStatus
  ) => {
    event.stopPropagation();
    onSetStatus(status);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete();
  };

  const canShowDelete =
    task.status === "TODO" ||
    task.status === "IN_PROGRESS" ||
    task.status === "DONE";

  return (
    <TaskCardContainer onClick={handleClick}>
      <Flex direction="column" gap="2">
        <Text weight="bold">{task.title}</Text>

        <Text size="2" color="gray">
          {task.description || "אין תיאור"}
        </Text>

        <TaskActionsRow justify="between" align="center">
          {/* left – status actions */}
          <TaskActionsLeft>
            {task.status === "TODO" && (
              <>
                <SidebarPillButton
                  size="1"
                  onClick={(event) => handleStatusClick(event, "IN_PROGRESS")}
                >
                  התחל
                </SidebarPillButton>

                <SidebarPillButton
                  size="1"
                  variant="soft"
                  color="crimson"
                  onClick={(event) => handleStatusClick(event, "CANCELLED")}
                >
                  בטל
                </SidebarPillButton>
              </>
            )}

            {task.status === "IN_PROGRESS" && (
              <>
                <SidebarPillButton
                  size="1"
                  color="green"
                  onClick={(event) => handleStatusClick(event, "DONE")}
                >
                  סיים
                </SidebarPillButton>

                <SidebarPillButton
                  size="1"
                  variant="soft"
                  color="crimson"
                  onClick={(event) => handleStatusClick(event, "CANCELLED")}
                >
                  בטל
                </SidebarPillButton>
              </>
            )}
          </TaskActionsLeft>

          {canShowDelete && (
            <SidebarPillButton
              size="1"
              variant="soft"
              color="crimson"
              onClick={handleDeleteClick}
            >
              מחיקה
            </SidebarPillButton>
          )}
        </TaskActionsRow>
      </Flex>
    </TaskCardContainer>
  );
};