import CommonLinkButton, {
  type CommonLinkButtonProps,
} from "./CommonLinkButton";

interface ActionButtonGroupProp {
  textLabel?: string;
  onClickText: () => void;
  buttonProps: CommonLinkButtonProps;
}

const ActionButtonGroup = ({
  textLabel = "다시 선택하기",
  onClickText,
  buttonProps,
}: ActionButtonGroupProp) => {
  return (
    <div className="flex flex-row w-full gap-4 justify-center">
      <button onClick={onClickText} className="cursor-pointer">
        <p className="text-caption mdh:text-small lgh:text-body font-medium mdh:font-medium lgh:font-medium text-gray-60">
          {textLabel}
        </p>
      </button>
      <CommonLinkButton {...buttonProps} />
    </div>
  );
};

export default ActionButtonGroup;
