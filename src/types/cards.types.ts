import type { LetterPaperType } from "../features/types/letterPaper.types";
import type { CreatorLastStep } from "../features/types/creatorFlowStep.types";

import type { CakeType } from "../features/types/cake.types";
import type { PlacedCandlesBySlot } from "../features/types/cake-doc.types";

export type CardStatus = "draft" | "published";

/**
 * public.cards Row 타입 (DB 1:1)
 * - created_at / updated_at / opened_at / completed_at: ISO string or null
 * - candles: jsonb (구체 타입이 확정되면 CandleDoc[] 등으로 교체 권장)
 */
export type CardRow = {
  id: string; // uuid
  creator_id: string; // uuid (auth.uid())
  receiver_name: string;
  pin_birth: string; // MMDD (text)

  // letter
  letter_paper_type: LetterPaperType; // NOT NULL DEFAULT 'default'
  letter: string | null; // text nullable

  // cake
  cake_type: CakeType | null; // text nullable (draft 단계에서 비어있을 수 있음)
  candles: PlacedCandlesBySlot | null; // jsonb nullable

  // flow/state
  status: CardStatus; // NOT NULL DEFAULT 'draft'
  last_step: CreatorLastStep | null; // 표준 CreatorLastStep로 좁히고 싶으면 교체 가능

  // receiver event
  is_opened: boolean; // NOT NULL DEFAULT false
  opened_at: string | null; // timestamptz nullable

  // timestamps
  created_at: string; // timestamptz NOT NULL DEFAULT now()
  updated_at: string; // timestamptz NOT NULL DEFAULT now() (trigger로 갱신)
  is_completed: boolean; // NOT NULL DEFAULT false
  completed_at: string | null; // timestamptz nullable
};
