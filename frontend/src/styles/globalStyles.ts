import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  :root {
    font-family: "Heebo", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }
`;