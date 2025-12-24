import * as Dialog from "@radix-ui/react-dialog";
import { SmallContent, Overlay } from "./dialogStyles";
import { CreateTaskForm } from "./CreateTaskForm";

type Props = {
  coords: { lng: number; lat: number } | null;
  onClose: () => void;
};

export const CreateTaskDialog = ({ coords, onClose }: Props) => {
  const open = !!coords;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Overlay />
        <SmallContent>
          {coords && (
            <CreateTaskForm
              lng={coords.lng}
              lat={coords.lat}
              onClose={onClose}
            />
          )}
        </SmallContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};