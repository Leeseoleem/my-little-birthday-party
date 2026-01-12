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
    flex flex-col w-full max-w-150 gap-9 md:gap-12 lg:gap-15
    px-6 pt-8 pb-8
    md:px-8 md:pt-10
    lg:px-10 lg:pt-12
    rounded-xl shadow-card bg-gray-0"
    >
      <PageTitle {...titleProps} />
      <div className="flex flex-col w-full gap-8 justify-start">{children}</div>
    </section>
  );
}
