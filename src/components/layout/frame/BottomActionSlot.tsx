import type { ReactNode } from "react";
import clsx from "clsx";

interface BottomActionSlotProps {
  children: ReactNode;
  hasBottomPadding?: boolean;
}

export default function BottomActionSlot({
  children,
  hasBottomPadding = true,
}: BottomActionSlotProps) {
  return (
    <div
      className={clsx(
        "mt-auto flex justify-center",
        hasBottomPadding === true && " pb-6"
      )}
    >
      {children}
    </div>
  );
}
