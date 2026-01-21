import { useState } from "react";
import clsx from "clsx";

import { receiverPageLayout } from "../../../../components/shared/styles/pageLayout";

import type { PinState } from "../types/gate.types";

import InvitationConfirmCard from "../InvitationConfirmCard";
import BottomActionSlot from "../../../../components/layout/frame/BottomActionSlot";
import CommonButton from "../../../../components/ui/Button/Button";

interface ReceiverPinGateSectionProps {
  pinState: PinState; // pin 확인 상태
  onSubmit: (birthDate: string) => void; // 제출 이벤트
}

export default function ReceiverPinGateSection({
  pinState,
  onSubmit,
}: ReceiverPinGateSectionProps) {
  const [enteredBirthDate, setEnteredBirthDate] = useState("");

  const isInvalid = pinState === "invalid";
  const canSubmit = enteredBirthDate.length >= 4;

  const handleClick = () => {
    if (!canSubmit) return;
    onSubmit(enteredBirthDate);
  };

  return (
    <div className={clsx(receiverPageLayout, "px-4")}>
      <InvitationConfirmCard
        isInvalid={isInvalid}
        birthDateInput={{
          id: "birthDate",
          value: enteredBirthDate,
          onChange: setEnteredBirthDate,
        }}
      />
      <BottomActionSlot>
        <CommonButton
          isDisabled={!canSubmit}
          label="확인하기"
          onClick={handleClick}
        />
      </BottomActionSlot>
    </div>
  );
}
