import React from "react";

export interface MenuBoardLayoutProps {
  children: React.ReactNode;
}

export default function MenuBoardLayout({ children }: MenuBoardLayoutProps) {
  return (
    <section
      className="relative flex pb-6 pt-9 md:pt-12 lg:pt-15 px-6 lg:px-25 w-full max-w-[600px] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/textures/receipt.png')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 flex flex-col">{children}</div>
    </section>
  );
}
