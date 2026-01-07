import type { ReactNode } from "react";
import InvitationHeader from "./InvitationHeader";
import InvitationInfo, { type InvitationInfoProps } from "./InvitationInfo";

export interface InvitationCardFrameProps {
  info: InvitationInfoProps;
  bottomSlot: ReactNode;
}

export default function InvitationCardFrame({
  info,
  bottomSlot,
}: InvitationCardFrameProps) {
  return (
    <div
      className="bg-[url('/assets/textures/paper-crumpled-white.png')]
          bg-no-repeat
          bg-center
          bg-size-[100%_100%]
          flex flex-col justify-center items-start pb-6 pt-9 px-6 md:px-12 lg:px-15 gap-6"
    >
      <InvitationHeader />
      <div className="w-full h-[1.5px] bg-gray-50" />
      <InvitationInfo {...info} />
      <img
        src="/assets/decor/invitation-complete.png"
        className="w-[200px] md:w-[350px] lg:w-[500px]"
      />
      <div className="w-full h-[1.5px] bg-gray-50" />
      {/* 하단 영역 */}
      <div className="flex flex-col w-full">{bottomSlot}</div>
    </div>
  );
}
