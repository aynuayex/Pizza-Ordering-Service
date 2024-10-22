import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import { AbilitiyProvider } from "./context/AbilityProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AbilitiyProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AbilitiyProvider>
    </QueryClientProvider>
  </StrictMode>
);
