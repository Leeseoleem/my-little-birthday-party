import type { ReactNode } from "react";

interface BottomActionSlotProps {
  children: ReactNode;
}

export default function BottomActionSlot({ children }: BottomActionSlotProps) {
  return <div className="mt-auto flex justify-center pb-6">{children}</div>;
}
