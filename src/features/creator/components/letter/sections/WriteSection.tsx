import CreatorLetterEditor, {
  type CreatorLetterEditorProps,
} from "../CreatorLetterEditor";
import BottomActionSlot from "../../../../../components/layout/frame/BottomActionSlot";
import ActionButtonGroup from "../../../../../components/ui/Button/ActionButtonGroup";
import type { CommonButtonProps } from "../../../../../components/ui/Button/Button";
interface WriteSectionProps {
  editor: CreatorLetterEditorProps;
  onClickText: () => void;
  buttonProps: CommonButtonProps;
}

export default function WriteSection({
  editor,
  onClickText,
  buttonProps,
}: WriteSectionProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex-1 min-h-0 h-full overflow-hidden">
        <CreatorLetterEditor {...editor} />
      </div>
      <BottomActionSlot>
        <ActionButtonGroup
          onClickText={onClickText}
          buttonProps={buttonProps}
        />
      </BottomActionSlot>
    </div>
  );
}
