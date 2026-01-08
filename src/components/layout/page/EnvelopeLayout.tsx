import clsx from "clsx";

export default function EnvelopeLayout() {
  return (
    <div
      className={clsx(
        // 항상 가장 뒤
        "absolute inset-x-0 bottom-0 z-0",
        // 봉투 아래 절반을 자르기 위한 클리핑
        "overflow-hidden",
        // 오브제이므로 인터랙션 차단
        "pointer-events-none select-none",
        "flex px-4 md:px-15"
      )}
    >
      {/* 2) 실제 봉투 이미지 */}
      <img
        src="/assets/envelopes/letter-envelope-open.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className={clsx(
          // 가운데 정렬
          "relative left-1/2 -translate-x-1/2",
          // width 기준 + 비율 유지
          "w-full max-w-[800px] h-auto",
          // 세로 절반만 보이게
          "translate-y-1/3"
        )}
      />
    </div>
  );
}
