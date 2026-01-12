import MenuBoardLayout from "../../../components/layout/frame/MenuBoardLayout";
import CommonLinkButton, {
  type CommonLinkButtonProps,
} from "../../../components/ui/Button/CommonLinkButton";

interface CakeMenuCardProps {
  menuContent: MenuContentProps;
  buttonProps: Omit<CommonLinkButtonProps, "label">;
}

const CakeMenuCard = ({ menuContent, buttonProps }: CakeMenuCardProps) => {
  return (
    <MenuBoardLayout>
      <div className="flex flex-col items-center gap-8">
        <MenuHeader />
        <MenuContent {...menuContent} />
        <div className="flex w-full justify-center">
          <CommonLinkButton label="선택하기" {...buttonProps} />
        </div>
      </div>
    </MenuBoardLayout>
  );
};

export default CakeMenuCard;

// ---------------------------- Menu Header & Content ---------------------------
export const MenuHeader = () => {
  return (
    <div className="flex flex-col gap-4 mdh:gap-5 justify-center items-center">
      <p className="text-accent-bs text-gray-50">MENU</p>
      <div className="h-[1px] bg-gray-50 w-full min-w-[250px]" />
    </div>
  );
};

interface MenuContentProps {
  title: string;
  description: string;
}

export const MenuContent = ({ title, description }: MenuContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-display-03 text-center text-main">{title}</p>
      <p className="text-center text-small break-keep text-gray-60">
        {description}
      </p>
    </div>
  );
};
