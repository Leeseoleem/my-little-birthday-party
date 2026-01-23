import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

// 기본 컴포넌트
import { PhaseLayer } from "../../../components/layout/frame/PhaseLayer";

// ----- letter 페이지 진행 타입 -----
import type { LetterPhase } from "../../../features/receiver/letter/types/LetterPhase.types";

// --- 1. closed ---
import ShakingEnvelope from "../../../features/receiver/letter/ShakingEnvelope";
import GuideBubble from "../../../components/ui/Bubble/GuideBubble";
// --- 2. opened ---
import EnvelopeLetter, {
  type Mode,
} from "../../../features/receiver/letter/EnvelopeLetter";
import HoldFillButtonProgress from "../../../features/receiver/letter/HoldFillButtonProgress";
// --- 4. reading ---
import ReceiverLetterContent from "../../../features/receiver/letter/ReceiverLetterContent";
import BottomActionSlot from "../../../components/layout/frame/BottomActionSlot";
import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

import { LETTER_DUMMY } from "../../../mocks/letterMocks";

export const Route = createFileRoute("/r/$cardId/letter")({
  component: ReceiverLetterPage,
});

function ReceiverLetterPage() {
  const [phase, setPhase] = useState<LetterPhase>("closed");

  // --- 1. closed ---
  const handleOpenEnvelope = () => {
    setPhase("opened");
  };

  // --- 2. opened ---
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<Mode>("idle");

  // --- 4. reading ---
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFlyComplete = () => {
    setTimeout(() => {
      setPhase("reading");
    }, 300);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10300);
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4">
      <AnimatePresence>
        {phase === "closed" && (
          <PhaseLayer
            layerKey="closed"
            className="flex-1 flex flex-col justify-center items-center"
          >
            <ShakingEnvelope onClick={handleOpenEnvelope} />
            <GuideBubble message="편지 봉투를 눌러 오픈해주세요" />
          </PhaseLayer>
        )}
        {(phase === "opened" || phase === "flying") && (
          <PhaseLayer
            layerKey="opened"
            className="relative flex-1 flex flex-col justify-center items-center"
          >
            <div className="relative z-0">
              <EnvelopeLetter
                letterPaperType="night"
                progress={progress}
                mode={mode}
                onFlyComplete={handleFlyComplete}
              />
            </div>
            {phase === "opened" && (
              <div>
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <HoldFillButtonProgress
                    disabled={mode === "fly"}
                    onProgressChange={setProgress}
                    onFilled={() => setMode("fly")}
                  />
                </div>
                <GuideBubble message="가운데를 꾹 눌러 편지지를 꺼내주세요" />
              </div>
            )}
          </PhaseLayer>
        )}
        {phase === "reading" && (
          <PhaseLayer
            layerKey="closed"
            className="flex flex-col h-full justify-center"
          >
            {/* 편지 영역: 남은 공간을 먹고, 줄어들 수 있어야 함 */}
            <div className="flex-1 min-h-0 h-full overflow-hidden">
              <ReceiverLetterContent
                type={LETTER_DUMMY.paperType}
                content={LETTER_DUMMY.content}
              />
            </div>

            {/* 버튼 영역: 고정 높이 */}
            <BottomActionSlot>
              <CommonLinkButton
                isDisabled={isButtonDisabled}
                label="다 읽었어요"
                to="/r/$cardId/party"
                params={{ cardId: "demo" }}
              />
            </BottomActionSlot>
          </PhaseLayer>
        )}
      </AnimatePresence>
    </div>
  );
}
