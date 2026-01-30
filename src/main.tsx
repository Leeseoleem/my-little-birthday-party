import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      {/* 화면 시작점: RouterProvider */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
