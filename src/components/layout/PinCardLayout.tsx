import type { ReactNode } from "react";
import PageTitle, { type PageTitleProps } from "../ui/PageTitle";

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
    flex flex-col w-full max-w-150 gap-15
    px-6 py-8
    md:px-10 md:py-14
    lg:px-20 lg:py-20
    rounded-xl shadow-card bg-gray-0"
    >
      <PageTitle {...titleProps} />
      <div className="flex flex-col w-full gap-8 justify-start">{children}</div>
    </section>
  );
}
