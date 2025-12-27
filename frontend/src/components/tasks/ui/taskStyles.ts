import { Button, Text } from "@radix-ui/themes";
import styled from "styled-components";

export const PillButtonBase = styled(Button)`
  font-weight: 900;
  padding-inline: 18px;
  border-radius: 999px;
`;

export const CloseXButtonBase = styled(Button)`
  font-weight: 900;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 999px;
`;

export const MutedErrorText = styled(Text)`
  text-align: center;
  font-weight: 800;
`;

export const MutedHintText = styled(Text)`
  text-align: center;
`;

export const Stack = styled.div<{ space?: number }>`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: ${({ space }) => (space ?? 16)}px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--gray-6);
  opacity: 0.55;
`;

export const SoftCard = styled.div`
  background: linear-gradient(180deg, var(--gray-2), var(--gray-1));
  border: 1px solid var(--gray-6);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
`;

export const WhiteCard = styled.div`
  background: white;
  border: 1px solid var(--gray-6);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
`;

export const CenterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const EndRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
