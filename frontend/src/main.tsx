import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";

import App from "./App";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { GlobalStyles } from "./styles/globalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <GlobalStyles />
      <App />
    </ReactQueryProvider>
  </StrictMode>
);
