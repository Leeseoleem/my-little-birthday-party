import clsx from "clsx";
import { contentClassName } from "../guideSlide.config";

const CreditContent = () => {
  return (
    <div className="flex flex-col justify-between h-full gap-6 mdh:gap-12 lgh:gap-16">
      <div className="flex flex-1 flex-col gap-4">
        <p className={contentClassName}>
          이 서비스는
          <br />
          생일을 조금 더 따뜻하게 전하고 싶다는 마음에서 시작했어요.
        </p>

        <p className={contentClassName}>
          부족한 점이 많지만, <br />
          이 서비스가 여러분의 소중한 사람에게 <br />
          따뜻한 생일 인사를 전하는 데 도움이 되길 바라요.
        </p>
        <p className={contentClassName}>
          앞으로도 더 나은 서비스를 만들기 위해 노력할게요. <br />
          사용하시면서 궁금한 점이나 개선할 점이 있다면 언제든지 알려주세요!
        </p>
      </div>
      <div className="mt-auto flex gap-4 mdh:gap-6 lgh:gap-8">
        <img
          src="/assets/brand/profile-icon.png"
          className="h-fit w-25 mdh:w-30 lgh:w-[150px]"
        />
        <div className="flex flex-col justify-between">
          <p className="text-small mdh:text-body lgh:text-sub-title text-gray-80">
            Made by | 이서림
          </p>
          <div className="flex flex-col gap-1 mdh:gap-2 lgh:gap-3">
            <p className={contentClassName}>이메일 | leeseorim0029@gmail.com</p>
            <div className="flex flex-row gap-1">
              <p className={contentClassName}>깃허브 | </p>
              <a
                href="https://github.com/Leeseoleem/my-little-birthday-party"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(contentClassName, "underline")}
              >
                깃허브 바로가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditContent;
