import clsx from "clsx";
import type { NoticeFrameProps } from "./NoticeFrame.types";
import CommonButton from "../../ui/Button/Button";
import CommonLinkButton from "../../ui/Button/CommonLinkButton";

export default function NoticeFrame({
  type = "default",
  style = "normal",
  segments,
  buttonProps,
}: NoticeFrameProps) {
  const textClass = clsx(
    "text-gray-60",
    style === "normal" && "text-caption",
    style === "display" && "text-letter-default-responsive"
  );
  return (
    <div className="flex flex-col w-full justify-center items-center gap-2">
      <p className={textClass}>
        {segments.map((seg, idx) => {
          if (seg.href) {
            return (
              <a
                key={idx}
                href={seg.href}
                target={seg.target ?? "_self"}
                rel={
                  seg.target === "_blank" ? "noreferrer noopener" : undefined
                }
                className={clsx(textClass, "underline underline-offset-2")}
              >
                {seg.text}
              </a>
            );
          }

          return <span key={idx}>{seg.text}</span>;
        })}
      </p>
      <div className="flex w-full justify-center">
        {type === "default" ? (
          <CommonButton {...buttonProps} />
        ) : (
          <CommonLinkButton {...buttonProps} />
        )}
      </div>
    </div>
  );
}
