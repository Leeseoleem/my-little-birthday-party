import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-dvh justify-center bg-gray-5">
      <div className="w-full max-w-[960px] lg:max-w-[1024px] bg-gray-10">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
