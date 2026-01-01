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
  // Storybook에서는 메모리 히스토리가 가장 예측 가능합니다. :contentReference[oaicite:3]{index=3}
  const history = createMemoryHistory({ initialEntries });

  // 최소 라우트 트리 구성
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    // 반드시 JSX.Element를 반환해야 하므로 Fragment로 감쌉니다.
    component: () => <>{children}</>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history,
  });

  // RouterProvider는 children을 받지 않습니다. :contentReference[oaicite:4]{index=4}
  return <RouterProvider router={router} />;
}
