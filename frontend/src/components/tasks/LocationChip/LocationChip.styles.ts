import styled from "styled-components";

export const ChipWrapper = styled.div<{ align: "start" | "center" | "end" }>`
  display: flex;
  justify-content: ${({ align }) =>
    align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center"};
`;

export const ChipBox = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 12px 22px;             /* same as py="3" px="5" */
  text-align: center;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--blue-2), var(--blue-1));
  border: 1px solid var(--blue-6);
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
`;