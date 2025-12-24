import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999999;
`;

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  max-width: calc(100vw - 32px);
  background: white;
  padding: 20px;
  border-radius: 16px;
  z-index: 1000000;
  box-shadow: 0 18px 60px rgba(0,0,0,0.22), 0 2px 10px rgba(0,0,0,0.12);
  outline: none;
`;

export const SmallContent = styled(Content)`
  width: 420px;
`;

export const RtlForm = styled.form`
  direction: rtl;
`;