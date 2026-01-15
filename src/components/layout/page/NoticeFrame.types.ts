import { type CommonButtonProps } from "../../ui/Button/Button";
import { type CommonLinkButtonProps } from "../../ui/Button/CommonLinkButton";

/**
 * 텍스트 (링크) 버튼
 */
export type TextSegment = {
  text: string;
  href?: string;
  target?: "_blank" | "_self";
};

/** 버튼 타입
 * default: CommonButton
 * link: CommonLinkButton
 */
type ButtonType = "default" | "link";

/** Notice 공통 타입 */
interface NoticeFrameBase {
  type?: ButtonType;
  style?: "normal" | "display";
  segments: TextSegment[];
}

export interface NoticeCommon extends NoticeFrameBase {
  type: "default";
  buttonProps: CommonButtonProps;
}

export interface NoticeLink extends NoticeFrameBase {
  type: "link";
  buttonProps: CommonLinkButtonProps;
}

export type NoticeFrameProps = NoticeCommon | NoticeLink;
