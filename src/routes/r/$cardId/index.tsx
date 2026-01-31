import { createFileRoute, redirect } from "@tanstack/react-router";
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

import type { InvitationInfoProps } from "../../../components/shared/invitation/InvitationInfo";
import { formatPinBirth } from "../../../utils/formatPinBirth";
import {
  getReceiverCardStatus,
  verifyPinAndGetInviteInfo,
} from "../../../lib/api/receiver/receiverGate";

export const Route = createFileRoute("/r/$cardId/")({
  loader: async ({ params }) => {
    const status = await getReceiverCardStatus(params.cardId);

    if (!status) {
      throw redirect({
        to: "/r/expired",
        search: { reason: "not_found", cardId: params.cardId },
      });
    }
    // 이미 열렸으면 PIN 스킵 → party로
    if (status.is_opened) {
      throw redirect({
        to: "/r/$cardId/party",
        params: { cardId: params.cardId },
      });
    }

    return {
      receiverName: status.receiver_name,
    };
  },
  component: ReceiverEntryGatePage,
});

function ReceiverEntryGatePage() {
  const { cardId } = Route.useParams();
  const { receiverName } = Route.useLoaderData();

  const [gateStep, setGateStep] = useState<GateStep>("pin");
  const [pinState, setPinState] = useState<PinState>("idle");

  const [inviteInfo, setInviteInfo] = useState<InvitationInfoProps | null>(
    null,
  );

  const handleSubmitPin = async (birthDate: string) => {
    setPinState("idle");

    const result = await verifyPinAndGetInviteInfo(cardId, birthDate);

    if (!result || !result.ok) {
      setPinState("invalid");
      return;
    }

    setPinState("valid");
    setInviteInfo({
      inviteeName: result.invitee_name ?? receiverName ?? "친구",
      inviteeBirthDate: result.invitee_birth_mmdd ?? "",
    });
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
            inviteeName: inviteInfo?.inviteeName ?? receiverName ?? "친구",
            inviteeBirthDate: formatPinBirth(
              inviteInfo?.inviteeBirthDate ?? "",
            ),
          }}
        />
      )}
    </GarlandLayout>
  );
}
