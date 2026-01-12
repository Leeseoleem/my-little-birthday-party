import type { ReactNode } from "react";
import PageTitle, { type PageTitleProps } from "../../ui/PageTitle";

interface PinCardLayoutProps {
  titleProps: PageTitleProps;
  children: ReactNode;
}

export default function PinCardLayout({
  titleProps,
  children,
}: PinCardLayoutProps) {
  return (
    <section
      className="
    flex flex-col w-full max-w-150 gap-9 mdh:gap-12 lgh:gap-15
    px-6 pt-8 pb-8
    mdh:px-8 mdh:pt-10
    lgh:px-10 lgh:pt-12
    rounded-xl shadow-card bg-gray-0"
    >
      <PageTitle {...titleProps} />
      <div className="flex flex-col w-full gap-8 justify-start">{children}</div>
    </section>
  );
}
