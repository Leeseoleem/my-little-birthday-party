import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import "./styles.css";

import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 화면 시작점: RouterProvider */}
    <RouterProvider router={router} />
  </StrictMode>
);
