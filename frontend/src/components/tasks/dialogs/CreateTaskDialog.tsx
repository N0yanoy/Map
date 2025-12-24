import * as Dialog from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/themes";
import {
  SmallContent,
  Overlay,
  DialogHeader,
  DialogTitle,
  DialogSubtitle,
  Section,
} from "./dialogStyles";
import { CreateTaskForm } from "./CreateTaskForm";
import { LocationChip } from "../LocationChip";
import { Stack } from "../ui/taskStyles";

type Props = {
  coords: { lng: number; lat: number } | null;
  onClose: () => void;
};

export const CreateTaskDialog = ({ coords, onClose }: Props) => {
  const isOpen = !!coords;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Overlay />
        <SmallContent>
          {coords && (
            <Stack space={16}>
              <DialogHeader>
                <DialogTitle>יצירת משימה</DialogTitle>
                <DialogSubtitle>הוסיפי משימה למיקום שנבחר במפה</DialogSubtitle>
              </DialogHeader>

              <Section>
                <LocationChip
                  lat={coords.lat}
                  lng={coords.lng}
                  align="center"
                  compact={false}
                />
                <Separator size="4" style={{ opacity: 0.6 }} />
              </Section>

              <CreateTaskForm
                lng={coords.lng}
                lat={coords.lat}
                onClose={onClose}
              />
            </Stack>
          )}
        </SmallContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
