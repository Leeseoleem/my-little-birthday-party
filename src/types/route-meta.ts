import type { LinkProps } from "@tanstack/react-router";

export interface CreatorHeaderMeta {
  value: number; // 0 ~ 1
  fallbackTo: LinkProps["to"];
}
