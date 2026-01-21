import React from "react";
import InvitationHeader from "./InvitationHeader";
import InvitationInfo, { type InvitationInfoProps } from "./InvitationInfo";

export interface InvitationCardFrameProps {
  info: InvitationInfoProps;
  children: React.ReactNode;
}

export default function InvitationCardFrame({
  info,
  children,
}: InvitationCardFrameProps) {
  return (
    <div
      className="bg-[url('/assets/textures/paper-crumpled-white.png')]
          z-10
          bg-no-repeat
          bg-center
          w-fit h-fit
          flex flex-col justify-center items-start pb-6 pt-9 px-8 mdh:px-12 lgh:px-15 gap-6 shadow-floating"
    >
      <InvitationHeader />
      <div className="w-full h-[1.5px] bg-gray-50" />
      <InvitationInfo {...info} />
      <img
        alt="" // 장식용 이미지이므로 스크린 리더가 건너뛸 수 있게 공백 처리
        src="/assets/decor/invitation-complete.png"
        className="w-full max-w-[300px] mdh:max-w-[350px] lgh:max-w-[500px]"
      />
      <div className="w-full h-[1.5px] bg-gray-50" />
      {/* 하단 영역 */}
      <div className="flex flex-col w-full gap-6">{children}</div>
    </div>
  );
}
