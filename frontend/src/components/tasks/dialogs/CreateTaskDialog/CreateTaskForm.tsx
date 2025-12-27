import { Text } from "@radix-ui/themes";
import { useState } from "react";
import type { Point } from "geojson";
import { useCreateTask } from "../../../../api/hooks/useCreateTask";
import { useTasksStore } from "../../../../store/tasksStore";
import { RtlForm, Section, CenterActions } from "../dialogStyles";
import { PillButton, MutedError } from "../../ui/TaskUi";
import { Stack } from "../../ui/taskStyles";
import { FormTextArea, FormTextFieldRoot, FormTextFieldSlot } from "./CreateTaskForm.styles";

type Props = {
  lng: number;
  lat: number;
  onClose: () => void;
};

export const CreateTaskForm = ({ lng, lat, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const TITLE_MAX_LENGTH = 60;

  const { setFocusedTask } = useTasksStore();
  const createTask = useCreateTask();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || createTask.isPending) return;

    const location: Point = { type: "Point", coordinates: [lng, lat] };

    createTask.mutate(
      {
        title: title.trim(),
        description: description.trim() ? description.trim() : undefined,
        location,
      },
      {
        onSuccess: (createdTask) => {
          setFocusedTask(createdTask);
          onClose();
        },
      }
    );
  };

  return (
    <RtlForm onSubmit={handleSubmit}>
      <Stack>
        <Section>
          <FormTextFieldRoot
            placeholder="כותרת המשימה"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX_LENGTH))}
          >
            <FormTextFieldSlot>📝</FormTextFieldSlot>
            <FormTextFieldSlot>
              <Text>
                {title.length}/{TITLE_MAX_LENGTH}
              </Text>
            </FormTextFieldSlot>
          </FormTextFieldRoot>

          <FormTextArea
            placeholder="תיאור (אופציונלי)"
            resize="vertical"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Section>

        {createTask.isError && <MutedError>יצירת המשימה נכשלה. נסי שוב.</MutedError>}

        <CenterActions>
          <PillButton
            type="button"
            variant="soft"
            color="gray"
            onClick={onClose}
            disabled={createTask.isPending}
            style={{ minWidth: 120 }}
          >
            ביטול
          </PillButton>

          <PillButton
            type="submit"
            color="blue"
            disabled={!title.trim() || createTask.isPending}
            style={{ minWidth: 120 }}
          >
            {createTask.isPending ? "יוצר…" : "יצירה"}
          </PillButton>
        </CenterActions>
      </Stack>
    </RtlForm>
  );
};
