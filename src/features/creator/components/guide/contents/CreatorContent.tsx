import { contentClassName } from "../guideSlide.config";

const CreatorContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className={contentClassName}>
        먼저 4자리 초대 번호를 정해요.
        <br /> 생일(MMDD)을 추천하지만, <br className="mdh:hidden" />두 사람만
        아는 특별한 숫자여도 괜찮아요.
      </p>

      <p className={contentClassName}>
        편지에 마음을 담고, <br className="mdh:hidden" />
        케이크에 초를 꽂아 하나의 파티를 완성해요.
      </p>

      <p className={contentClassName}>
        모든 준비가 끝나면, <br className="mdh:hidden" />
        링크, 혹은 카카오톡을 통해 공유할 수 있어요.
      </p>
    </div>
  );
};
export default CreatorContent;
