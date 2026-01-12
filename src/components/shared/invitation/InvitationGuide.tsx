import type { UserRole } from "../../../types/userRole.types";

const InvitationGuide = ({ variant }: { variant: UserRole }) => {
  const titleClass = `text-body lgh:text-sub-title font-semibold text-gray-70`;
  const desClass = `text-caption lgh:text-small text-gray-60 whitespace-pre-wrap`;
  return (
    <div>
      {variant === "creator" ? (
        <section className="flex flex-col text-left gap-2">
          <h2 className={titleClass}>
            초대하고 싶은 사람에게 링크를 공유해 보세요
          </h2>
          <p className={desClass}>
            이 링크를 받은 사람은 생일 정보 확인 후{" "}
            <br className="block mdh:hidden" />
            파티 페이지를 볼 수 있어요.
            {"\n"}
            링크는 신뢰할 수 있는 사람에게만 전달해 주세요.
          </p>
        </section>
      ) : (
        <section className="flex flex-col text-left gap-2">
          <h2 className={titleClass}>당신을 위한 생일 파티에 초대합니다</h2>
          <p className={desClass}>
            이 파티의 주인공이 맞다면,
            <br className="block mdh:hidden" />
            아래 버튼을 눌러 입장해 주세요
          </p>
        </section>
      )}
    </div>
  );
};

export default InvitationGuide;
