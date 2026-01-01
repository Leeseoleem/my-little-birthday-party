import type { PropsWithChildren } from "react";
import {
  RouterProvider,
  Outlet,
  createRouter,
  createMemoryHistory,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

type Props = PropsWithChildren<{
  initialEntries?: string[];
}>;

export function TanStackRouterDecorator({
  children,
  initialEntries = ["/"],
}: Props) {
  const history = createMemoryHistory({ initialEntries });

  // 최소 라우트 트리 구성
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <>{children}</>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history,
  });

  return <RouterProvider router={router} />;
}
