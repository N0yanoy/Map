import { Button, Text } from "@radix-ui/themes";
import type React from "react";

export const PillButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    radius="full"
    style={{
      fontWeight: 900,
      paddingInline: 18,
      borderRadius: 999,
      ...(props.style ?? {}),
    }}
  />
);

export const CloseXButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    radius="full"
    variant="soft"
    color="gray"
    size="3"
    aria-label="סגור"
    style={{
      fontWeight: 900,
      width: 44,
      height: 44,
      padding: 0,
      borderRadius: 999,
      ...(props.style ?? {}),
    }}
  >
    ✕
  </Button>
);

export const MutedError = ({ children }: { children: React.ReactNode }) => (
  <Text size="2" color="red" style={{ textAlign: "center", fontWeight: 800 }}>
    {children}
  </Text>
);

export const MutedHint = ({ children }: { children: React.ReactNode }) => (
  <Text size="2" color="gray" style={{ textAlign: "center" }}>
    {children}
  </Text>
);
