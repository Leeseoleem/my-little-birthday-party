import type { BubbleTailPosition } from "./bubble.types";

/**
 * 말풍선 꼬리 방향에 따른 border-radius 클래스 매핑
 */
export const BUBBLE_TAIL_CLASS: Record<BubbleTailPosition, string> = {
  "left-top": "rounded-b-4xl rounded-tr-4xl",
  "left-bottom": "rounded-t-4xl rounded-br-4xl",
  "right-top": "rounded-b-4xl rounded-tl-4xl",
  "right-bottom": "rounded-t-4xl rounded-bl-4xl",
};
