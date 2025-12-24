import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Text } from "@radix-ui/themes";

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
  padding: 24px;             
  border-radius: 22px;        
  z-index: 1000000;
  box-shadow: 0 18px 60px rgba(0,0,0,0.22), 0 2px 10px rgba(0,0,0,0.12);
  outline: none;
`;

export const SmallContent = styled(Content)`
  width: 440px; 
`;

export const RtlForm = styled.form`
  direction: rtl;
`;

export const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  text-align: center;   
`;

export const DialogTitle = styled(Text)`
  display: block;
  font-size: 30px;
  line-height: 36px;
  font-weight: 900;
`;

export const DialogSubtitle = styled(Text)`
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: var(--gray-10);
  font-weight: 600;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;    
`;

export const CenterActions = styled.div`
  display: flex;
  justify-content: center; 
  gap: 12px;              
  margin-top: 8px;
`;