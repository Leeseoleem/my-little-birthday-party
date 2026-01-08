import type { ReactNode } from "react";
import clsx from "clsx";

interface GarlandLayoutProps {
  children: ReactNode;
}

const GARLAND_SIZE =
  "w-[clamp(240px,65vw,340px)] sm:w-[380px] md:w-[460px] lg:w-[520px] xl:w-[600px]";
const GARLAND_BG_SIZE =
  "bg-size-[clamp(240px,65vw,340px)_auto] sm:bg-size-[380px_auto] md:bg-size-[460px_auto] lg:bg-size-[520px_auto] xl:bg-size-[600px_auto]";
const GARLAND_BASE =
  "absolute inset-y-0 bg-[url('/assets/decor/party-garland.png')] bg-no-repeat";

export default function GarlandLayout({ children }: GarlandLayoutProps) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={clsx(
            GARLAND_BASE,
            "left-0 bg-top-left",
            GARLAND_SIZE,
            GARLAND_BG_SIZE
          )}
        />
        <div
          className={clsx(
            GARLAND_BASE,
            "right-0 bg-top-right",
            GARLAND_SIZE,
            GARLAND_BG_SIZE
          )}
        />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
