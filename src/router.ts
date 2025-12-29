import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// 라우터 생성
export const router = createRouter({
  routeTree,
});

// router를 전역으로 사용하기 위한 타입 선언
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
