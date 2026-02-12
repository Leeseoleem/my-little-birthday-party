import CommonLinkButton from "../../../../components/ui/Button/CommonLinkButton";
import HelpButton from "../../../../components/ui/Button/HelpButton";

const IntroCard = () => {
  return (
    <div
      className="bg-[url('/assets/textures/paper-crumpled-white.png')]
          bg-no-repeat
          bg-center
          w-full max-w-[500px] h-auto
          z-50
          drop-shadow-floating
          flex flex-col justify-center items-center py-15 px-6 mdh:px-8 xl:px-9 gap-8 mdh:gap-12 lgh:gap-15 bg-amber-400"
    >
      <img
        src="/assets/brand/title-logo.png"
        alt="나의 작은 생일 파티"
        className="h-full min-h-[300px] w-auto"
      />
      <div className="flex flex-col w-full justify-center items-center gap-3">
        <HelpButton
          label="어떤 서비스인가요?"
          to="/guides/interactive-birthday-card"
        />
        <div className="flex w-full justify-center items-center">
          <CommonLinkButton label="시작하기" to="/creator/info" />
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
