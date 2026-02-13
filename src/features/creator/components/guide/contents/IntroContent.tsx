import { contentClassName } from "../guideSlide.config";

const IntroContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className={contentClassName}>
        짧게 남기는 축하 메시지도 물론 고마운 마음이지만,
        <br />
        어쩐지 그날의 분위기까지 전하기엔 조금 부족하게 느껴질 때가 있어요.
      </p>

      <p className={contentClassName}>
        그래서 만들었어요.
        <br />
        초를 불고, 케이크를 보고, 편지를 여는 아주 작은 생일 파티.
      </p>

      <p className={contentClassName}>
        나의 작은 생일 파티는 <br />
        축하 메시지를 보내는 서비스가 아니라, <br className="mdh:hidden" />
        그날의 순간을 함께 건네는 서비스예요.
      </p>
    </div>
  );
};
export default IntroContent;
