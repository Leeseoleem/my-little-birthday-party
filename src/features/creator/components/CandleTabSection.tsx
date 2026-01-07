import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";

import type { CandleType } from "../../types/candle.types";

export type CandleTabPages = Record<CandleType, React.ReactNode>;

const TABS = [
  { key: "long", label: "긴 초" },
  { key: "short", label: "짧은 초" },
  { key: "special", label: "특별한 초" },
] as const;

export default function CandleTabSection({ pages }: { pages: CandleTabPages }) {
  const [tab, setTab] = useState<CandleType>("long");
  return (
    <section className="w-full">
      <Tabs.Root
        className="w-full"
        value={tab}
        onValueChange={(t) => setTab(t as CandleType)}
        activationMode="automatic" // 방향키 탭 이동 활성화
        orientation="horizontal"
      >
        <Tabs.List
          className="flex justify-center bg-transparent"
          aria-label="초 카테고리 탭"
        >
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab.key}
              value={tab.key}
              className={clsx(
                "flex flex-1 w-full justify-center items-end py-3 rounded-t-3xl",
                "bg-gray-20",
                "text-gray-60 text-small md:text-body lg:text-sub-title font-medium",
                "data-[state=active]:text-gray-80 data-[state=active]:font-bold",
                "data-[state=active]:bg-gray-0",
                "outline-none focus-visible:ring-2 focus-visible:ring-gray-40"
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="long" className="py-8 outline-none bg-gray-0">
          {pages.long}
        </Tabs.Content>
        <Tabs.Content value="short" className="py-8 outline-none bg-gray-0">
          {pages.short}
        </Tabs.Content>
        <Tabs.Content value="special" className="py-8 outline-none bg-gray-0">
          {pages.special}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
