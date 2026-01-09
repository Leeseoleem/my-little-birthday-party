import type { TextSegment } from "../../../components/layout/page/NoticeFrame.types";

export const segments: TextSegment[] = [
  { text: "시작하기를 누르면 " },
  {
    text: "이용약관",
    href: "https://example.com/privacy",
    target: "_blank",
  },
  { text: " 및 " },
  {
    text: "개인정보 처리방침",
    href: "https://example.com/privacy",
    target: "_blank",
  },
  { text: "에 동의하는 것으로 간주됩니다." },
];
