import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { CreatorHeaderMeta, CreatorLayoutMeta } from "./types/route-meta";

// 라우터 생성
export const router = createRouter({
  routeTree,
});

// router를 전역으로 사용하기 위한 타입 선언
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  // CreatorHeaderMeta 속성을 직접 작성
  interface StaticDataRouteOption {
    creatorHeader?: CreatorHeaderMeta;
    creatorLayout?: CreatorLayoutMeta;
  }
}
