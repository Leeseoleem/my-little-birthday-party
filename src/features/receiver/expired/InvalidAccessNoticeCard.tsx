import NoticeFrame from "../../../components/layout/page/NoticeFrame";

interface InvalidAccessNoticeCardProps {
  onClick: () => void;
}

export default function InvalidAccessNoticeCard({
  onClick,
}: InvalidAccessNoticeCardProps) {
  return (
    <div
      className="bg-[url('/assets/textures/paper-crumpled-white.png')]
          z-10
          bg-no-repeat
          bg-center
          w-fit h-fit
          flex flex-col justify-center pb-8 pt-10 px-8 mdh:px-12 lgh:px-15 gap-6 shadow-floating"
    >
      <h1 className="text-display-03 mdh:text-display-02 lgh:text-display-01 text-main">
        앗!
        <br />
        잘못된 접근 경로예요
      </h1>
      <div className="w-full h-[1.5px] bg-gray-50" />
      <p className="mt-2 text-caption mdh:text-small lgh:text-body mdh:font-medium lgh:font-medium text-gray-60">
        링크가 잘못되었거나 만료됐을 수 있어요.
        <br />
        정확한 링크로 다시 접속해주세요.
      </p>
      <img
        alt="" // 장식용 이미지이므로 스크린 리더가 건너뛸 수 있게 공백 처리
        src="/assets/decor/invitation-complete.png"
        className="w-full max-w-[300px] mdh:max-w-[350px] lgh:max-w-[500px]"
      />

      <div className="w-full h-[1.5px] bg-gray-50" />
      <div className="w-full flex justify-center">
        <NoticeFrame
          type="default"
          segments={[
            {
              text: "아래 버튼을 누르면 서비스를 이용할 수 있어요",
            },
          ]}
          buttonProps={{
            label: "메인으로 이동하기",
            onClick: onClick,
          }}
        />
      </div>
    </div>
  );
}
