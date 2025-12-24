import { TextField, TextArea, Button, Text, Flex, Box, Separator } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import type { Point } from "geojson";
import { useCreateTask } from "../../api/hooks/useCreateTask";
import { useTasksStore } from "../../store/tasksStore";
import { RtlForm } from "./dialogStyles";

type Props = {
  lng: number;
  lat: number;
  onClose: () => void;
};

export const CreateTaskForm = ({ lng, lat, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const titleMax = 60;

  const coordsText = useMemo(
    () => `📍 ${lat.toFixed(4)}° צפון, ${lng.toFixed(4)}° מזרח`,
    [lat, lng]
  );

  const { selectTask } = useTasksStore();
  const createTaskMutation = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || createTaskMutation.isPending) return;

    const location: Point = {
      type: "Point",
      coordinates: [lng, lat],
    };

    createTaskMutation.mutate(
      {
        title: title.trim(),
        description: desc.trim() ? desc.trim() : undefined,
        location,
      },
      {
        onSuccess: (created) => {
          selectTask(created);
          onClose();
        },
      }
    );
  };

  return (
    <RtlForm onSubmit={handleSubmit} lang="he">
      <Flex direction="column" gap="4">
        <Flex direction="column" align="center" gap="2">
          <Text size="6" weight="bold">יצירת משימה</Text>
        </Flex>

        <Separator size="4" />

        <Flex direction="column" gap="2">
          <TextField.Root
            placeholder="כותרת"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleMax))}
            size="3"
            radius="large"
          >
            <TextField.Slot>📝</TextField.Slot>
            <TextField.Slot>
              <Text size="2" color="gray">{title.length}/{titleMax}</Text>
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        <Flex direction="column" gap="2">
          <TextArea
            placeholder="תיאור"
            resize="vertical"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            size="3"
            radius="large"
            dir="rtl"
            style={{ minHeight: 160 }}
          />
        </Flex>

        <Box px="3" py="2" style={{ borderRadius: 999, background: "var(--blue-2)", border: "1px solid var(--blue-6)" }}>
          <Text size="2" color="blue" weight="bold">{coordsText}</Text>
        </Box>

        {createTaskMutation.isError && (
          <Text size="2" color="red">יצירת המשימה נכשלה. נסי שוב.</Text>
        )}

        <Flex justify="end" gap="2" mt="2">
          <Button type="button" variant="soft" color="gray" radius="full" onClick={onClose} disabled={createTaskMutation.isPending}>
            ביטול
          </Button>
          <Button type="submit" color="blue" radius="full" disabled={!title.trim() || createTaskMutation.isPending}>
            {createTaskMutation.isPending ? "יוצר..." : "יצירה"}
          </Button>
        </Flex>
      </Flex>
    </RtlForm>
  );
};
