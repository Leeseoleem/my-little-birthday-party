import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { useState, forwardRef } from "react";

import { motion, useReducedMotion } from "framer-motion";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>;

type TooltipButtonProps = NativeButtonProps & {
  tooltip: React.ReactNode;
  tooltipClassName?: string;
};

export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  function TooltipButton(
    { tooltip, tooltipClassName, children, type = "button", ...buttonProps },
    forwardedRef,
  ) {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "bottom",
      middleware: [offset(8), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      move: false,
      delay: { open: 0, close: 0 }, // 즉시 열고 닫기
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const { setReference, setFloating } = refs;

    const referenceProps = getReferenceProps({ type, ...buttonProps });

    // 동작 줄이기 설정 여부 확인
    const reduceMotion = useReducedMotion();

    return (
      <>
        <motion.button
          // Floating UI 기준 요소 등록
          ref={(node) => {
            setReference(node);
            // 외부에서 ref도 받고 싶다면 함께 연결
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          {...referenceProps}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          {children}
        </motion.button>

        {isOpen && (
          <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={
              tooltipClassName ??
              `
                pointer-events-none
                rounded-md bg-black/70 px-3 py-1.5
                text-xs text-white whitespace-nowrap
              `
            }
          >
            {tooltip}
          </div>
        )}
      </>
    );
  },
);
