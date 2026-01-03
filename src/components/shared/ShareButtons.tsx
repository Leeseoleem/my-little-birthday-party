import { ShareButtonItem } from "./ShareButtonItem";
import { IoMdMail } from "react-icons/io";
import { RiKakaoTalkFill, RiLinkM } from "react-icons/ri";

interface ShareButtonsProps {
  url: string;
  title?: string;
  description?: string;
}

const ARIA = {
  kakao: "카카오톡으로 공유하기",
  mail: "이메일로 공유하기",
  copy: "링크 복사하기",
} as const;

const ShareButtons = ({ url, title, description }: ShareButtonsProps) => {
  const handleShareKakao = () => {
    // TODO: Kakao SDK 연동
    console.log("share kakao", { url, title, description });
  };

  const handleShareMail = () => {
    // TODO: mailto 링크 생성
    console.log("share mail", { url, title, description });
  };

  const handleCopyLink = async () => {
    // TODO: navigator.clipboard.writeText(url)
    console.log("copy link", url);
  };
  return (
    <div className="flex flex-row gap-6">
      <ShareButtonItem
        ariaLabel={ARIA.kakao}
        Icon={RiKakaoTalkFill}
        onClick={handleShareKakao}
      />
      <ShareButtonItem
        ariaLabel={ARIA.mail}
        Icon={IoMdMail}
        onClick={handleShareMail}
      />
      <ShareButtonItem
        ariaLabel={ARIA.copy}
        Icon={RiLinkM}
        onClick={handleCopyLink}
      />
    </div>
  );
};

export default ShareButtons;
