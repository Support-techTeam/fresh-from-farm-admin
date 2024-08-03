import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { UserProvider } from "./context/UserContext";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No container found");
}
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>
);
