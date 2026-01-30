import { ShareButtonItem } from "./ShareButtonItem";
import { RiKakaoTalkFill, RiLinkM } from "react-icons/ri";

export interface ShareButtonsProps {
  onShareKakao: () => void | Promise<void>;
  onCopyLink: () => void | Promise<void>;
}

const ARIA = {
  kakao: "카카오톡으로 공유하기",
  copy: "링크 복사하기",
} as const;

const ShareButtons = ({ onShareKakao, onCopyLink }: ShareButtonsProps) => {
  return (
    <div className="flex flex-row gap-6">
      <ShareButtonItem
        ariaLabel={ARIA.kakao}
        Icon={RiKakaoTalkFill}
        onClick={onShareKakao}
      />
      <ShareButtonItem
        ariaLabel={ARIA.copy}
        Icon={RiLinkM}
        onClick={onCopyLink}
      />
    </div>
  );
};

export default ShareButtons;
