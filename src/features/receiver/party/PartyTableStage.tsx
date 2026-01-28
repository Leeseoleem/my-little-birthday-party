import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo } from "react";

import { pxToPercentX, pxToPercentY } from "./partyTableLayout";

import CakeStack from "../../creator/components/build/CakeStack";
import type { CakeType } from "../../types/cake.types";
import { CAKE_MENU } from "../../creator/data/cakeMenu.data";

type PartyTableStageProps = {
  cakeType: CakeType;
};

export default function PartyTableStage({ cakeType }: PartyTableStageProps) {
  const navigate = useNavigate();
  const { cardId } = useParams({ strict: false }) as { cardId: string };

  // 케이크 이미지 메뉴
  const menu = useMemo(() => {
    return CAKE_MENU.find((m) => m.type === cakeType);
  }, [cakeType]);

  if (!menu) return null;

  return (
    <div className="h-dvh w-full flex items-center justify-center">
      {/* Stage */}
      <div className="relative w-[min(92vw,800px)] aspect-[800/470]">
        {/* 테이블 배경 */}
        <img
          src="/assets/decor/table.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none pointer-events-none"
          draggable={false}
        />

        {/* CakeStack */}
        <button
          type="button"
          aria-label="케이크 이벤트 페이지로 이동"
          onClick={() =>
            navigate({
              to: "/r/$cardId/event",
              params: { cardId },
              search: { returnTo: "party" },
            })
          }
          className="absolute z-10 bg-transparent"
          style={{
            left: pxToPercentX(125), // 15.625%
            bottom: pxToPercentY(350), // 74.468%
            width: pxToPercentX(400), // 50%
            aspectRatio: "400 / 240",
          }}
        >
          <CakeStack cakeSrc={menu?.imageSrc} />
        </button>

        {/* Letter Envelope */}
        <button
          type="button"
          aria-label="편지 이벤트 페이지로 이동"
          onClick={() =>
            navigate({
              to: "/r/$cardId/letter",
              params: { cardId },
              search: { returnTo: "party" },
            })
          }
          className="absolute z-10 bg-transparent"
          style={{
            right: pxToPercentX(100),
            bottom: pxToPercentY(370),
            width: pxToPercentX(150),
            aspectRatio: "150 / 75",
          }}
        >
          <img
            src="/assets/envelopes/letter-envelope-drop.png"
            alt="envelope"
            className="absolute bottom-0 left-1/2 w-full -translate-x-1/2
                   select-none pointer-events-none z-1"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
