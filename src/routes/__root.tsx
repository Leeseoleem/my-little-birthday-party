import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
