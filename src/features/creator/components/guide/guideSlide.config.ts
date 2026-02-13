import type { ReceiptLayoutHeaderProps } from "../../../../components/layout/frame/ReceiptLayoutHeader";

// === sections ===
import {
  IntroContent,
  CreatorContent,
  ReceiverContent,
  CreditContent,
} from "./contents";

export type GuideSlideKey = "intro" | "creator" | "receiver" | "credit";

// 콘텐츠를 반환하는 팩토리 함수 타입
export type GuideSlideContentFactory = () => React.ReactNode;

export type GuideSlideData = {
  key: GuideSlideKey;
  header: ReceiptLayoutHeaderProps; // { title, subTitle? }
  bodyTitle?: string; // 선택
  content: GuideSlideContentFactory; // 팩토리 함수로 변경
};

export const contentClassName =
  "text-caption mdh:text-small lgh:text-body lgh:font-medium text-gray-60 break-normal whitespace-normal leading-relaxed";

export const GUIDE_SLIDES: readonly GuideSlideData[] = [
  {
    key: "intro",
    header: {
      title: "나의 작은 생일 파티는요…",
      subTitle: "어떤 서비스인지, 먼저 알려드릴게요.",
    },
    bodyTitle: "생일인데 “축하해” 한 마디 보내기엔 아쉬울 때, \n있으셨나요?",
    content: IntroContent,
  },
  {
    key: "creator",
    header: {
      title: "보내는 사람은 이렇게 준비해요",
      subTitle: "작은 선물을 준비하는 마음으로",
    },
    bodyTitle: "당신은 한 편의 생일 파티를 기획하게 돼요",
    content: CreatorContent,
  },
  {
    key: "receiver",
    header: {
      title: "받는 사람은 이렇게 느껴요",
      subTitle: "단순히 메시지를 읽는 것이 아닌, 특별한 순간으로",
    },
    bodyTitle: "축하 메시지는,\n특별한 하루를 위한 선물이 돼요",
    content: ReceiverContent,
  },
  {
    key: "credit",
    header: { title: "마치며" },
    content: CreditContent,
  },
];
