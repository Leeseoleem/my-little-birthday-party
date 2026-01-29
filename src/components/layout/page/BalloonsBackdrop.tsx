import clsx from "clsx";

export default function BalloonsBackdrop() {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-0",
        "pointer-events-none select-none",
      )}
    >
      {/* 좌/우 오프셋을 반응형으로: 작은 화면에서는 줄어들고, 큰 화면에서는 100px 유지 */}
      <div
        className={clsx(
          "absolute top-0 left-0 right-0",
          "px-[clamp(24px,8vw,50px)]",
          "pt-[clamp(12px,calc(160px-10vw),160px)]",
        )}
      >
        <div className={clsx("flex items-end justify-between")}>
          <img
            src="/assets/decor/balloons-left.png"
            alt=""
            draggable={false}
            className={clsx(
              "h-auto",
              // 크기도 화면에 따라 자연스럽게
              "w-[clamp(160px,22vw,240px)]",
            )}
          />

          <img
            src="/assets/decor/balloons-right.png"
            alt=""
            draggable={false}
            className={clsx("h-auto", "w-[clamp(160px,22vw,240px)]")}
          />
        </div>
      </div>
    </div>
  );
}
