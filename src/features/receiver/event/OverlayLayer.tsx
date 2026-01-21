import type { CakeEventPhase } from "./types/cakeEventPhase.types";
import { getOverlayStyle } from "./overlay.config";

type OverlayLayerProps = {
  phase: CakeEventPhase;
  className?: string;
};

export default function OverlayLayer({ phase, className }: OverlayLayerProps) {
  return (
    <div className={className} style={getOverlayStyle(phase)} aria-hidden />
  );
}
