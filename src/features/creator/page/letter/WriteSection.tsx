import CreatorLetterEditor, {
  type CreatorLetterEditorProps,
} from "../../components/CreatorLetterEditor";
import BottomActionSlot from "../../../../components/layout/frame/BottomActionSlot";
import ActionButtonGroup from "../../../../components/ui/Button/ActionButtonGroup";

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
    <>
      <CreatorLetterEditor {...editor} />
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
    </>
  );
}
