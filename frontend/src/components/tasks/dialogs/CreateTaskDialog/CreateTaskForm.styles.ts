import styled from "styled-components";
import { TextField, TextArea } from "@radix-ui/themes";

export const FormTextFieldRoot = styled(TextField.Root)`
  border-radius: 15px;
  padding-inline: 8px;
`;

export const FormTextFieldSlot = styled(TextField.Slot)`
  padding-inline: 6px;
`;

export const FormTextArea = styled(TextArea)`
  min-height: 150px;
  border-radius: 15px;
  padding: 14px 16px;
`;