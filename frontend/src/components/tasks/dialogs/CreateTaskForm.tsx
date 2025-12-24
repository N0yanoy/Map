import { TextField, TextArea, Text } from "@radix-ui/themes";
import { useState } from "react";
import type { Point } from "geojson";
import { useCreateTask } from "../../../api/hooks/useCreateTask";
import { useTasksStore } from "../../../store/tasksStore";
import { RtlForm, Section, CenterActions } from "./dialogStyles";
import { PillButton, MutedError } from "../ui/TaskUi";
import { Stack } from "../ui/taskStyles";

type Props = {
  lng: number;
  lat: number;
  onClose: () => void;
};

export const CreateTaskForm = ({ lng, lat, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleMaxLength = 60;

  const { selectTask } = useTasksStore();
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
          selectTask(createdTask);
          onClose();
        },
      }
    );
  };

  return (
    <RtlForm onSubmit={handleSubmit} lang="he">
      <Stack space={16}>
        <Section>
          <TextField.Root
            placeholder="כותרת המשימה"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleMaxLength))}
            radius="full"
            size="3"
            style={{
              borderRadius: 15,
              paddingInline: 8,
            }}
          >
            <TextField.Slot style={{ paddingInline: 6 }}>📝</TextField.Slot>
            <TextField.Slot style={{ paddingInline: 6 }}>
              <Text size="2" color="gray">
                {title.length}/{titleMaxLength}
              </Text>
            </TextField.Slot>
          </TextField.Root>

          <TextArea
            placeholder="תיאור (אופציונלי)"
            resize="vertical"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            radius="large"
            size="3"
            dir="rtl"
            style={{
              minHeight: 150,
              borderRadius: 15,
              padding: "14px 16px",
            }}
          />
        </Section>

        {createTask.isError && <MutedError>יצירת המשימה נכשלה. נסי שוב.</MutedError>}

        <CenterActions>
          <PillButton
            type="button"
            variant="soft"
            color="gray"
            size="3"
            onClick={onClose}
            disabled={createTask.isPending}
            style={{ minWidth: 120 }}
          >
            ביטול
          </PillButton>

          <PillButton
            type="submit"
            color="blue"
            size="3"
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
