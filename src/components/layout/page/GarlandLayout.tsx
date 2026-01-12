import type { ReactNode } from "react";
import clsx from "clsx";

interface GarlandLayoutProps {
  hasHeader?: boolean;
  children: ReactNode;
}

const GARLAND_SIZE =
  "w-[clamp(240px,65vw,340px)] sm:w-[380px] md:w-[460px] lg:w-[520px] xl:w-[600px]";
const GARLAND_BG_SIZE =
  "bg-size-[clamp(240px,65vw,340px)_auto] sm:bg-size-[380px_auto] md:bg-size-[460px_auto] lg:bg-size-[520px_auto] xl:bg-size-[600px_auto]";
const GARLAND_BASE =
  "absolute inset-y-0 bg-[url('/assets/decor/party-garland.png')] bg-no-repeat";

export default function GarlandLayout({
  hasHeader = false,
  children,
}: GarlandLayoutProps) {
  return (
    <div className="relative min-h-dvh">
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* viewport에 fixed로 붙어있지만, 내부에서 '가운데 1024px 기준선'을 강제 생성 */}
        <div
          className={clsx(
            "absolute left-1/2 h-full w-full max-w-[900px] -translate-x-1/2",
            hasHeader ? "top-14" : "top-0"
          )}
        >
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
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
