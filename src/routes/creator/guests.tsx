import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { pageLayout } from "../../components/shared/styles/pageLayout";

import PageTitle from "../../components/ui/PageTitle";
import { GuestDialogueSection } from "../../features/creator/components/guest/GuestDialogueSection";
import BottomActionSlot from "../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../components/ui/Button/CommonLinkButton";

export const Route = createFileRoute("/creator/guests")({
  staticData: {
    creatorHeader: {
      kind: "progress-exit",
      value: 1.0,
    },
  },
  component: CreatorGuestSelectPage,
});

function CreatorGuestSelectPage() {
  const DEFAULT_GUEST_LINES = {
    raccoon: "어서와, 여긴 내가 만든 파티! 즐길 준비 됐지?",
    cat: "냥! 생일엔 역시 케이크지!",
    hedgehog: "축하합니다! 당신은 고슴도치의 행운을 받았습니다.",
  };

  const [raccoonLine, setRaccoonLine] = useState(DEFAULT_GUEST_LINES.raccoon);
  const [catLine, setCatLine] = useState(DEFAULT_GUEST_LINES.cat);
  const [hedgehogLine, setHedgehogLine] = useState(
    DEFAULT_GUEST_LINES.hedgehog,
  );

  const isDisabled =
    !raccoonLine.trim() || !catLine.trim() || !hedgehogLine.trim();

  return (
    <div className={pageLayout}>
      <PageTitle
        title="파티를 마무리하기 전에"
        subTitle="파티에 있는 친구들이 짧은 인사를 남길 수 있어요"
      />
      <GuestDialogueSection
        dialogues={{
          raccoon: { value: raccoonLine, onChange: setRaccoonLine },
          cat: { value: catLine, onChange: setCatLine },
          hedgehog: { value: hedgehogLine, onChange: setHedgehogLine },
        }}
      />
      <BottomActionSlot>
        <CommonLinkButton
          isDisabled={isDisabled}
          label="초대장 완성하기"
          to="/creator/complete"
          replace
        />
      </BottomActionSlot>
    </div>
  );
}
