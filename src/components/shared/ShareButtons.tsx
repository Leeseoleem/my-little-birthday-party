import { ShareButtonItem } from "./ShareButtonItem";
import { IoMdMail } from "react-icons/io";
import { RiKakaoTalkFill, RiLinkM } from "react-icons/ri";

export interface ShareButtonsProps {
  onShareKakao: () => void | Promise<void>;
  onShareMail: () => void | Promise<void>;
  onCopyLink: () => void | Promise<void>;
}

const ARIA = {
  kakao: "카카오톡으로 공유하기",
  mail: "이메일로 공유하기",
  copy: "링크 복사하기",
} as const;

const ShareButtons = ({
  onShareKakao,
  onShareMail,
  onCopyLink,
}: ShareButtonsProps) => {
  return (
    <div className="flex flex-row gap-6">
      <ShareButtonItem
        ariaLabel={ARIA.kakao}
        Icon={RiKakaoTalkFill}
        onClick={onShareKakao}
      />
      <ShareButtonItem
        ariaLabel={ARIA.mail}
        Icon={IoMdMail}
        onClick={onShareMail}
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
