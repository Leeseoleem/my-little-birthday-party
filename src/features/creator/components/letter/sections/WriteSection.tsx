import CreatorLetterEditor, {
  type CreatorLetterEditorProps,
} from "../../CreatorLetterEditor";
import BottomActionSlot from "../../../../../components/layout/frame/BottomActionSlot";
import ActionButtonGroup from "../../../../../components/ui/Button/ActionButtonGroup";

interface WriteSectionProps {
  editor: CreatorLetterEditorProps;
  onClickText: () => void;
  isDisabled?: boolean;
}

export default function WriteSection({
  editor,
  onClickText,
  isDisabled = false,
}: WriteSectionProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex-1 min-h-0 h-full overflow-hidden">
        <CreatorLetterEditor {...editor} />
      </div>
      <BottomActionSlot>
        <ActionButtonGroup
          onClickText={onClickText}
          buttonProps={{
            isDisabled: isDisabled,
            label: "작성 완료하기",
            to: "/creator/cake/select",
          }}
        />
      </BottomActionSlot>
    </div>
  );
}
