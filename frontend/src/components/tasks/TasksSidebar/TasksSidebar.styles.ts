import styled from "styled-components";
import { Box, Button, Flex } from "@radix-ui/themes";

export const SidebarShell = styled(Box)`
  width: 360px;
  border-right: 1px solid var(--gray-6);
  background: var(--gray-1);
  overflow: auto;
`;

export const SidebarColumn = styled(Flex)`
  flex-direction: column;
  gap: 12px;
`;

export const SidebarSection = styled(Box)`
  margin-bottom: 16px;
`;

export const TaskCardContainer = styled(Box)`
  background: white;
  border: 1px solid var(--gray-6);
  border-radius: 14px;
  cursor: pointer;
  padding: 12px;
`;

export const TaskActionsRow = styled(Flex)`
  margin-top: 8px;
`;

export const TaskActionsLeft = styled(Flex)`
  gap: 8px;
`;

export const SidebarPillButton = styled(Button)`
  font-weight: 800;
  border-radius: 999px;
`;