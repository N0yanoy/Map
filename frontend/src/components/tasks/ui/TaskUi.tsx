import { Button } from "@radix-ui/themes";
import type React from "react";
import { CloseXButtonBase, MutedErrorText, MutedHintText, PillButtonBase } from "./taskStyles";

export const PillButton = (props: React.ComponentProps<typeof Button>) => (
  <PillButtonBase {...props} />
);

export const CloseXButton = (props: React.ComponentProps<typeof Button>) => (
  <CloseXButtonBase
    {...props}
    radius="full"
    variant="soft"
    color="gray"
    size="3"
    aria-label="סגור">
    ✕
  </CloseXButtonBase>
);

export const MutedError = ({ children }: { children: React.ReactNode }) => (
  <MutedErrorText color="red">
    {children}
  </MutedErrorText>
);

export const MutedHint = ({ children }: { children: React.ReactNode }) => (
  <MutedHintText color="gray">
    {children}
  </MutedHintText >
);
