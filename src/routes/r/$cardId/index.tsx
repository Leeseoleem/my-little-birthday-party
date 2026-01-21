import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// 화면 상태 여부
import type {
  GateStep,
  PinState,
} from "../../../features/receiver/pin/types/gate.types";

import GarlandLayout from "../../../components/layout/page/GarlandLayout";

import {
  ReceiverPinGateSection,
  ReceiverInvitationSection,
} from "../../../features/receiver/pin/sections";

export const Route = createFileRoute("/r/$cardId/")({
  component: ReceiverEntryGatePage,
});

function ReceiverEntryGatePage() {
  const [gateStep, setGateStep] = useState<GateStep>("pin");
  const [pinState, setPinState] = useState<PinState>("idle");

  const handleSubmitPin = (birthDate: string) => {
    // UI 설계 단계용 더미
    const isValid = birthDate === "1014";

    if (!isValid) {
      setPinState("invalid");
      return;
    }

    setPinState("valid");
    setGateStep("invite");
  };

  return (
    <GarlandLayout>
      {gateStep === "pin" && (
        <ReceiverPinGateSection
          pinState={pinState}
          onSubmit={handleSubmitPin}
        />
      )}

      {gateStep === "invite" && (
        <ReceiverInvitationSection
          info={{
            inviteeName: "이서림",
            inviteeBirthDate: "10-14",
          }}
        />
      )}
    </GarlandLayout>
  );
}
