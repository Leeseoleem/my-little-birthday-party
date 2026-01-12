import CommonLinkButton from "../../../components/ui/Button/CommonLinkButton";

const IntroCard = () => {
  return (
    <div
      className="bg-[url('/assets/textures/paper-crumpled-white.png')]
          bg-no-repeat
          bg-center
          w-full max-w-[500px] h-auto
          z-50
          drop-shadow-floating
          flex flex-col justify-center items-center py-15 px-6 md:px-8 xl:px-9 gap-8 md:gap-12 lg:gap-15 bg-amber-400"
    >
      <img
        src="/assets/brand/title-logo.png"
        alt="나의 작은 생일 파티"
        className="h-full min-h-[300px] x-auto"
      />
      <div className="flex w-full justify-center items-center">
        <CommonLinkButton label="시작하기" to="/creator/info" />
      </div>
    </div>
  );
};

export default IntroCard;
