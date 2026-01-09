import { AppHeader, CloseButton, BackButton, ExitButton } from "./index";
import type { CreatorHeaderMeta } from "../../../types/route-meta";

interface renderHeaderProps {
  meta?: CreatorHeaderMeta;
  onExitToMain: () => void;
}

export const renderHeader = ({ meta, onExitToMain }: renderHeaderProps) => {
  if (!meta) return null;

  switch (meta.kind) {
    case "close":
      return <AppHeader right={<CloseButton {...meta.headerProps} />} />;
    case "back":
      return <AppHeader left={<BackButton {...meta.headerProps} />} />;
    case "progress-exit":
      return (
        <AppHeader
          progress={{
            value: meta.value,
          }}
          left={<ExitButton onClick={onExitToMain} />}
        />
      );
  }
};
