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
      <div className="flex flex-col items-center gap-8 md:gap-12 lg:gap-15">
        <MenuHeader />
        <MenuContent {...menuContent} />
        <CommonLinkButton label="선택하기" {...buttonProps} />
      </div>
    </MenuBoardLayout>
  );
};

export default CakeMenuCard;

// ---------------------------- Menu Header & Content ---------------------------
export const MenuHeader = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 justify-center items-center">
      <p className="text-accent text-gray-50">MENU</p>
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
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
      <p className="text-display-03 md:text-display-02 lg:text-display-01 text-center text-main">
        {title}
      </p>
      <p className="text-center text-small lg:text-body lg:font-medium text-gray-60">
        {description}
      </p>
    </div>
  );
};
