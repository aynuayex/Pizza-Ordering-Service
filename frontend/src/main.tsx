import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
