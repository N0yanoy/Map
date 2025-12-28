import styled from "styled-components";
import { Text } from "@radix-ui/themes";

export const InfoLabelText = styled(Text)`
  font-weight: 800;
`;

export const InfoValueText = styled(Text)<{ dimmed?: boolean }>`
  font-weight: 900;
  text-align: left;
  opacity: ${({ dimmed }) => (dimmed ? 0.6 : 1)};
`;

export const DescriptionTitle = styled(Text)`
  font-weight: 900;
  text-align: center;
`;

export const DescriptionBody = styled(Text)`
  display: block;
  margin-top: 10px;
  text-align: center;
  line-height: 24px;
`;