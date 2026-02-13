import { contentClassName } from "../guideSlide.config";

const ReceiverContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className={contentClassName}>
        초대 번호를 입력하면 파티에 참여할 수 있어요.
        <br />
        당신이 준비한 케이크와 편지가 반겨줄 거예요.
      </p>
      <p className={contentClassName}>
        케이크의 초를 불고, 편지를 열어보며,
        <br />
        당신이 전한 마음을 천천히 마주하게 돼요.
      </p>
      <p className={contentClassName}>
        파티가 끝난 뒤에도 <br />
        언제든지 다시 방문해 그날의 순간을 떠올릴 수 있어요.
      </p>
      <p className={contentClassName}>
        (* 파티는 생성일로부터 30일간 유지돼요.)
      </p>
    </div>
  );
};

export default ReceiverContent;
